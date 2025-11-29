from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

# Signup serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'email', 'password']

    def validate_email(self, value):
        """
        Validate that the email is unique and properly formatted.
        """
        value = value.lower().strip()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists")
        return value

    def create(self, validated_data):
        email = validated_data["email"].lower().strip()
        password = validated_data['password']
        
        # Create user with email as username
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        logger.info(f"User created: {email} with username: {user.username}")
        return user

# SIMPLE AND WORKING Login Serializer
class EmailTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        email = attrs.get('email', '').lower().strip()
        password = attrs.get('password', '').strip()

        logger.info(f"Login attempt for email: {email}")

        if not email or not password:
            raise serializers.ValidationError("Both email and password are required")

        try:
            # Get user by email
            user = User.objects.get(email=email)
            logger.info(f"User found: {user.username}")
            
            # Check password directly
            if user.check_password(password):
                logger.info("Password verified successfully")
                
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                
                return {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': {
                        'id': user.id,
                        'email': user.email
                    }
                }
            else:
                logger.warning("Invalid password")
                raise serializers.ValidationError("Invalid email or password")
                
        except User.DoesNotExist:
            logger.warning(f"No user found with email: {email}")
            raise serializers.ValidationError("Invalid email or password")
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            raise serializers.ValidationError("Login failed")