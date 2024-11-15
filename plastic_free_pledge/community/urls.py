from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PledgeViewSet

router = DefaultRouter()
router.register(r'pledges', PledgeViewSet)  # Registers the PledgeViewSet with the URL

urlpatterns = [
    path('', include(router.urls)),
]
