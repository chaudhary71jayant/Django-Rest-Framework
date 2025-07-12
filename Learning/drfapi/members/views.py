from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all() #Added the views here
    serializer_class = MemberSerializer #Added serializer here
    permission_class = [IsAuthenticated] #Added the permission class here

    #setting up the filters for the MemberViewSet
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['email'] #filter by email
    search_feilds = ['name','email'] #search by name or email
    ordering_feilds = ['name', 'email'] #ordering by name and email



