from rest_framework.viewsets import ModelViewSet
from .models import Pledge
from .serializers import PledgeSerializer
from django.http import JsonResponse


class PledgeViewSet(ModelViewSet):
    queryset = Pledge.objects.all()  # Fetch all pledge records
    serializer_class = PledgeSerializer
    def perform_destroy(self, instance):
        # Ensure the image is deleted when pledge is deleted
        instance.delete()

def delete_pledge(request, id):
    try:
        pledge = Pledge.objects.get(id=id)
        pledge.delete()  # Delete the pledge
        return JsonResponse({'message': 'Pledge deleted successfully'}, status=200)
    except Pledge.DoesNotExist:
        return JsonResponse({'error': 'Pledge not found'}, status=404)