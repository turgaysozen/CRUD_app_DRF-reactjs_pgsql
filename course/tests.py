from django.test import TestCase

from rest_framework.test import APIClient
from .models import Course
from django.contrib.auth import get_user_model

User = get_user_model()

class CourseTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test_user", password="1")
        Course.objects.create(name="Course 01", description="Course 01 Desc", price=100)
        Course.objects.create(name="Course 02", description="Course 02 Desc", price=100)

        self.course_count = Course.objects.all().count() 

    def get_client_with_auth(self):
        resp = self.client.post('http://localhost:8000/api/account/token/', {'username':'test_user', 'password':'1'}, format='json')
        token = resp.data["access"]
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        return client

    def test_course_create(self):
        created_course = Course.objects.create(name="Test Course 01", description="Test Course 01 Desc", price=100)
        self.assertEqual(created_course.id, 3)
    
    def test_course_list(self):
        course_list = Course.objects.all()
        self.assertEqual(self.course_count, course_list.count())
    
    def test_course_list_by_api(self):
        resp = self.get_client_with_auth().get('/api/course/', data={'format': 'json'})
        self.assertEqual(resp.status_code, 200)
    
    def test_course_create_by_api(self):
        resp = self.get_client_with_auth().post('/api/course/create', data={"format": "json", "name": "course test 01", "description": "course test 01desc", "price": 100 })
        self.assertEqual(resp.status_code, 201)

    def test_course_update_by_api(self):
        course = Course.objects.get(name="Course 01")
        resp = self.get_client_with_auth().put('/api/course/update/' + str(course.id), data={"format": "json", "name": "course test 01 updt", "description": "course test 01 desc upd", "price": 200 })
        self.assertEqual(resp.status_code, 200)
    
    def test_course_delete(self):
        course = Course.objects.get(name="Course 01")
        resp = self.get_client_with_auth().delete('/api/course/delete/' + str(course.id))
        self.assertEqual(resp.status_code, 200)

