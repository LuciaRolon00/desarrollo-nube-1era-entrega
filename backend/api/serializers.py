from rest_framework import serializers
from .models import Juego, Contacto
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Q 

class JuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = "__all__"

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        user = User.objects.filter(
            Q(username__iexact=attrs.get('username')) | 
            Q(email__iexact=attrs.get('username'))
        ).first()

        if user and user.check_password(attrs.get('password')):
            refresh = self.get_token(user)
            data = {}
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            return data
        
        raise serializers.ValidationError("No se encontró ninguna cuenta activa con esas credenciales.")

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token