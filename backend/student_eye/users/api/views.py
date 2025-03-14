from django.contrib.auth import get_user_model
from django.contrib.auth import login
from django.contrib.auth import logout
from drf_spectacular.utils import OpenApiResponse
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import UserLoginSerializer
from .serializers import UserRegistrationSerializer
from .serializers import UserSerializer

User = get_user_model()


class AuthViewSet(viewsets.ViewSet):
    """
    A viewset to handle authentication actions.
    """

    permission_classes = (AllowAny,)

    @extend_schema(
        request=UserRegistrationSerializer,
        responses={201: UserSerializer},
        description="Register a new user.",
    )
    @action(detail=False, methods=["post"], url_path="register")
    def register(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        request=UserLoginSerializer,
        responses={200: UserSerializer},
        description="Login a user with email and password.",
    )
    @action(detail=False, methods=["post"], url_path="login")
    def login(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        responses={200: OpenApiResponse(description="Logout successful.")},
        description="Logout the current user.",
    )
    @action(detail=False, methods=["post"], url_path="logout")
    def logout(self, request):
        logout(request)
        return Response(
            {"detail": "Logged out successfully."}, status=status.HTTP_200_OK
        )


class ProfileViewSet(viewsets.GenericViewSet):
    """
    A viewset for handling user profiles.
    - GET /profiles/{id}/: Retrieve a user’s profile by ID.
    - GET /profiles/me/: Retrieve the current user’s profile.
    - PATCH/PUT /profiles/me/: Update the current user’s profile.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @extend_schema(
        responses={200: UserSerializer}, description="Retrieve a user’s profile by ID."
    )
    def retrieve(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        methods=["GET", "PATCH", "PUT"],
        request=UserSerializer,
        responses={200: UserSerializer},
        description="Retrieve or update the current user’s profile.",
    )
    @action(detail=False, methods=["get", "patch", "put"], url_path="me")
    def me(self, request):
        # Ensure the user is authenticated.
        if not request.user or not request.user.is_authenticated:
            return Response(
                {"detail": "Not authenticated."}, status=status.HTTP_401_UNAUTHORIZED
            )
        if request.method == "GET":
            serializer = self.get_serializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            partial = request.method == "PATCH"
            serializer = self.get_serializer(
                request.user, data=request.data, partial=partial
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
