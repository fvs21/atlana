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
    
class SearchCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id',
            'name'
        ]
    
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
                tag, _ = Tag.objects.get_or_create(title=tag_str)
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
        
    
class TagSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    def get_title(self, obj):
        return obj.get_title_display()

    class Meta:
        model = Tag
        fields = [
            'title'
        ]
    
class RatingSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer()
    tags = TagSerializer(many=True)
    grade_achieved = serializers.SerializerMethodField()

    def get_grade_achieved(self, obj):
        return obj.get_grade_achieved_display()

    class Meta:
        model = Rating
        field = [
            'professor',
            'comment',
            'course',
            'mandatory_assistance',
            'recommended',
            'quality',
            'difficulty',
            'tags',
            'grade_achieved',
            'created_at'
        ]