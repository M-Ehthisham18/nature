from rest_framework.viewsets import ModelViewSet
from .models import Pledge
from .serializers import PledgeSerializer

class PledgeViewSet(ModelViewSet):
    queryset = Pledge.objects.all()  # Fetch all pledge records
    serializer_class = PledgeSerializer
