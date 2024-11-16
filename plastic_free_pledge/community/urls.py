from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PledgeViewSet
from . import views

router = DefaultRouter()
router.register(r'pledges', PledgeViewSet)  # Registers the PledgeViewSet with the URL

urlpatterns = [
    path('', include(router.urls)),
    path('api/pledges/<int:id>/', views.delete_pledge, name='delete-pledge'),
]
