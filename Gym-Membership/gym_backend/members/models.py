from django.db import models

# Create your models here.
class Member(models.Model):
    
    GENDER_CHOICES = [
        ('M','Male'),
        ('F','Female'),
    ]

    MEMBERSHIP_CHOICES = [
       ('Premium'),
       ('Basic'),
    ]

    name = models.CharField(max_length=100)
    age = models.PositiveBigIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    join_date = models.DateField(auto_now_add=True)
    membership_type = models.CharField(max_length=100)

    def __str__(self):
        return self.name
