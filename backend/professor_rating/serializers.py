from rest_framework import serializers

from professor_rating.models import Professor

class ProfessorSerializer(serializers.ModelSerializer):
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