from rest_framework.routers import DefaultRouter
from .views import MemberViewSet
from django.urls import path,include

router = DefaultRouter()
router.register(r'members',MemberViewSet,basename = 'members')

urlpatterns = [
    path('', include(router.urls)),
]
