from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all() #Added the views here
    serializer_class = MemberSerializer #Added serializer here
    permission_class = [IsAuthenticated] #Added the permission class here
