from django.db import models

# Create your models here.
class Member(models.Model):
    
    GENDER_CHOICES = [
        ('M','Male'),
        ('F','Female'),
    ]

    MEM_CHOICES = [
        ('premium','Premium'),
        ('basic','Basic'),
        ('vip','VIP'),
    ]

    name = models.CharField(max_length=100)
    age = models.PositiveBigIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    join_date = models.DateField(auto_now_add=True)
    membership_type = models.CharField(max_length=10, choices=MEM_CHOICES)

    def __str__(self):
        return self.name
