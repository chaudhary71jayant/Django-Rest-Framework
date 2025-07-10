# 🧑‍🤝‍🧑 Members API

A simple REST API for managing members, built with **Django** and **Django REST Framework**.

## 📌 Features

- List all members
- Add a new member
- Retrieve a member by ID
- Built using DRF's `APIView`

---

### 1.Add installed Apps in the settings.py

INSTALLED_APPS = [
    ...
    'rest_framework',
    'members',
]

### 2. Model - members/models.py

from django.db import models

class Member(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

//Don't forget to migrate them by makemigrations and migrate

### 3. API Endpoints 

Mehtod          EndPOint        Description
GET             /api/members/   List all members
Post            /api/members/   Add a new Member
GET             /api/members/<id>  Get Member 

details by Id

### 4.Folder Structure

members-api/
├── members/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
├── members_api/     ← Main project folder
│   ├── settings.py
│   ├── urls.py
├── manage.py


### 5. URL routing in the Main member app - members/urls.py

from django.urls import path
from .views import MemberList, MemberDetail

urlpatterns = [
    path('members/', MemberList.as_view()),
    path('members/<int:pk>/', MemberDetail.as_view()),
]

### 6. project/urls.py

from django.urls import path, include

urlpatterns = [
    ...
    path('api/', include('members.urls')),
]

### 7. Serializers are the main backbones 

    =>They convert django models to JSON so that anyone who is fetching the data can understand the format
    =>ModelSerializer in the serializer file automatically  generates feilds from your model handels validation,savind and updating easily

### 8. GenericApiVIew + Mixins

    =>It is mainly used to 
        - Reuse logic for common actions(list,create,retrieve,update,delete)
        - keep views short and powerful
        - still retain full control

### 9. ViewSets 

    -This is the cleanest way to build a CRUD API
    - DRF automatically wires up everything 
    - we will use viewsets.ModelsViewSet

    => GET /members/ -> List
    => POST /members/ -> create
    => GET /members/<id>/ -> retrieve
    => PUT /members/<id>/ -> update
    => DELETE /members/<id>/ -> delete

### 10. Routers members/urls.py

    It will automatically generates all the URLs you need

    the code will be : 

    from rest_framework.routers import DefaultRouter
    from .views import MemberViewSet

    router = DefaultRouter()
    router.register(r'members', MemberViewSet, basename='members')

    urlpatterns = router.urls

## Phase 2 :

Authentication and Permissions in DRF

    - We know Authentication is required to stop any unauthorised person to change the data in the API
    - With Authentication only authorised users can acess or modify the API

    We will read : 
        - Register the users to login with Django's built in User Model
        - Secure API acess through DRF tokenauthentication
        - control access with DRF's IsAuthenticated permission

    Intitating :

        -start by icluding 'rest_framework.authentication' in the installed apps
        - run the migrations to create the token table with command 'python manage.py migrate'

    Token creation :

        - open the shell of python by 'python manage.py shell'
        -write the the code : 
            from django.contrib.auth.models import User
            from rest_framework.authtoken.models import Token

            user = User.objects.get(username='admin')  # use your created username
            token = Token.objects.create(user=user)
            print(token.key)




