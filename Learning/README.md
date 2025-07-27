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

 ### Authentication and Permissions in DRF

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

 ### Permissions

        Permissions are used to grant or deny acess to views based on request's authentication and user.
        
        permission_class = [PermissionName]

        Built in permissions in Django : 

            - AllowAny : Allows unrestricted access (good for public API's)
            - IsAuthenticated : Only allows logged-in users(with valid token or session) to access the API.
            - IsAdminUser : only allows admin users(is_staff=True) to access.
            - IsAuthenticatedReadOnly : Unauthenticated users only GET is allowed. full access to authenticated users.

        
        => Set Global or view level Permission :

            - Global (in Settings.py):

                
                    REST_FRAMEWORK = {
                        'DEFAULT_PERMISSION_CLASSES'    : [
                            'rest_framework.permissions.IsAuthenticated',
                        ]
                    }

            - View-Level(in views.py):

                from rest_framework.permission import IsAuthenticated

                class MyView(APIView):

## Filetering & Searching


    =>Filetering and serching makes your API usable in real world apps(search by name/email)
    
    Firstly install django-filter with pip and add it to the settings.py installed apps

    then add :
        'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ] this in the rest_framework

    Then update the viewSet by first import the filters and then add the filters like mentioned in the views.py

    after adding them to rest framework dictionary and modifying viewSet for the search filter and ordering 
    Runserver and check with urls : 
        -   http://127.0.0.1:8000/members/?search=Jayant
        http://127.0.0.1:8000/members/?email=someone@example.com
        http://127.0.0.1:8000/members/?ordering=-joined_at

                
## Pagination 

    Pagination breaks your api response into smaller chunks so it doesn't return thousands of records at once. It's especially important for performance and forntend apps that load lists (like tables or infinite scrolls).

    => We can add pagination to settings.py in the rest framework dictionary like :
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 2,  # Number of members per page (you can change this)=> Like for page size two there will be only two enteries per page 



## JWT Authentication

### Phase 1 : Setup JWT Authentication 
        1. Install the library
            
            =>Install JWT with "pip install djangorestframework-simplejwt"


        2. Configure DRF to JWT

            => In settings.py in the rest framework dictionary add the following : 
                 'DEFAULT_AUTHENTICATION_CLASSES': (
                    'rest_framework_simplejwt.authentication.JWTAuthentication',
                ),
                'DEFAULT_PERMISSION_CLASSES': (
                    'rest_framework.permissions.IsAuthenticated',
                )

            => Add JWT URLs to the urls.py in the project

            
        3. Create /api/token/ and /api/token/referesh/ end points
        4. Test authentication via postman or browseer.
### Phase 2 : Protect your APIs with JWT
        5. Secure any API with JWT
        6. Test authorized bs unautherized requests