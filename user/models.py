from django.db import models


class User(models.Model):
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    school = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + self.lastname    
