from django.db import models
from django.contrib.auth.models import User

class Pledge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    description = models.TextField()

class Challenge(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    points = models.IntegerField(default=10)

class Achievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    date_earned = models.DateField(auto_now_add=True)
