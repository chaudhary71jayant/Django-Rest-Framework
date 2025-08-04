from .models import Member
from rest_framework import viewsets
from .serializers import MemberSerializer

# Create your views here.
class GymMemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

