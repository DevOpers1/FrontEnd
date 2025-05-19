from rest_framework import serializers
from .models import User
from .models import Trainer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'login', 'email', 'age', 'weight', 'height']

