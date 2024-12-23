from rest_framework import serializers
from .models import Pledge 

class PledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pledge
        fields = ['id', 'user', 'description', 'image', 'date','author']
