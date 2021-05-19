from django.db import models
from django.db.models.fields.related import ForeignKey


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    price = models.IntegerField()
    duration = models.IntegerField()
    video_id = models.CharField(max_length=30)
    categories = models.ManyToManyField(Category)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
