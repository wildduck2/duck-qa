from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "name",
            "bio",
            "picture",
        )

    def create(self, validated_data):
        # Remove password from validated_data and create user via the custom manager.
        password = validated_data.pop("password")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        user = authenticate(email=email, password=password)
        if not user:
            msg = "Invalid email or password"
            raise serializers.ValidationError(msg)
        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    # Use this serializer for profile retrieval and updates.
    password = serializers.CharField(
        write_only=True,
        required=False,
        validators=[validate_password],
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
            "bio",
            "picture",
            "password",
        )
        read_only_fields = (
            "id",
            "email",
        )

    def update(self, instance, validated_data):
        # Update all provided fields; if password is provided, update it securely.
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
