from rest_framework import serializers

from professor_rating.models import Course, Professor, Rating, Tag

class ProfessorSerializer(serializers.ModelSerializer):
    department = serializers.SerializerMethodField()

    def get_department(self, obj):
        return obj.get_department_display()

    class Meta:
        model = Professor
        fields = [
            'id',
            'name', 
            'average_rating',
            'recommendation_rate',
            'department',
            'difficulty_level'
        ]

class CreateProfessorSerializer(serializers.ModelSerializer):
    department = serializers.SerializerMethodField()

    def get_department(self, obj):
        return obj.get_department_display()
    
    class Meta:
        model = Professor
        fields = [
            'name',
            'department'
        ]

    def create(self, validated_data):
        return Professor.objects.create(
            name=validated_data.get('name'), 
            department=validated_data.get('department')
        )
    
class RateProfessorSerializer(serializers.ModelSerializer):
    class CourseSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=False)
        create = serializers.BooleanField()
        course_name = serializers.CharField(required=False)


    tags = serializers.ListField(child=serializers.CharField())
    course = CourseSerializer()
    quality = serializers.FloatField(min_value=1, max_value=5)
    difficulty = serializers.FloatField(min_value=1, max_value=5)

    class Meta:
        model = Rating
        fields = [
            "comment",
            "professor",
            "course",
            "mandatory_assistance",
            "recommended",
            "quality",
            "difficulty",
            "tags",
            "grade_achieved"
        ]

    def validate_tags(self, value):
        tags = []

        for tag_str in value:
            try:
                tag, _ = Tag.objects.get_or_create(name=tag_str)
                tags.append(tag)
            except Exception:
                raise serializers.ValidationError("Invalid tag.")

        return tags
    
    def validate_course(self, value):
        if not value['create']:
            if not 'id' in value:
                raise serializers.ValidationError("Course id field missing.")

            return Course.objects.get(id=value['id'])
        
        if not 'course_name' in value:
            raise serializers.ValidationError("Course name missing.")
        
        return Course.objects.create(name=value['course_name'])
    
    def create(self, validated_data):
        rating = Rating.objects.create(
            professor=validated_data['professor'],
            comment=validated_data['comment'],
            course=validated_data['course'],
            mandatory_assistance=validated_data['mandatory_assistance'],
            quality=validated_data['quality'],
            difficulty=validated_data['difficulty'],
            grade_achieved = validated_data['grade_achieved'],
            recommended=validated_data['recommended']
        )

        rating.set_tags(validated_data['tags'])

        return rating