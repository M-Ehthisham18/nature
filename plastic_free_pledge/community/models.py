# from django.db import models
# from django.contrib.auth.models import User

# class Pledge(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     date = models.DateField(auto_now_add=True)
#     description = models.TextField()

# class Challenge(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     points = models.IntegerField(default=10)

# class Achievement(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     date_earned = models.DateField(auto_now_add=True)


from django.db import models
from django.contrib.auth.models import User
import os
from django.conf import settings

class Pledge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to='pledge_images/', null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)  # Automatically set the date when created

    def __str__(self):
        return self.description
    
    def delete(self, *args, **kwargs):
        # Delete the image from the file system
        if self.image:
            image_path = self.image.path
            if os.path.exists(image_path):
                os.remove(image_path)
        super(Pledge, self).delete(*args, **kwargs)