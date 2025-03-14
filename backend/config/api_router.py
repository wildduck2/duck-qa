from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from student_eye.users.api.views import AuthViewSet
from student_eye.users.api.views import ProfileViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("authenticaion", AuthViewSet, basename="authenticaion")
router.register("profile", ProfileViewSet, basename="profile")


app_name = "api"
urlpatterns = router.urls
