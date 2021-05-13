from django.test import TestCase

from rest_framework.test import APIClient
from .models import User
from django.contrib.auth import get_user_model

User_Model = get_user_model()

class UserTestCase(TestCase):
    def setUp(self):
        self.user = User_Model.objects.create_user(username="test_user", password="1")
        User.objects.create(name="User 01", lastname="Lastname 01", school="School 01", city="City 01", country="Country 01")
        User.objects.create(name="User 02", lastname="Lastname 02", school="School 02", city="City 02", country="Country 02")

        self.user_count = User.objects.all().count() 

    def get_client_with_auth(self):
        resp = self.client.post('http://localhost:8000/api/token/', {'username':'test_user', 'password':'1'}, format='json')
        token = resp.data["access"]
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        return client

    def test_user_create(self):
        created_user = User.objects.create(name="Test User 01", lastname="Test Lastname 01", school="Test School 01", city="Test City 01", country="Test Country 01")
        self.assertEqual(created_user.id, 3)
    
    def test_user_list(self):
        user_list = User.objects.all()
        self.assertEqual(self.user_count, user_list.count())
    
    def test_user_list_by_api(self):
        resp = self.get_client_with_auth().get('/api/user/', data={'format': 'json'})
        self.assertEqual(resp.status_code, 200)
    
    def test_user_create_by_api(self):
        resp = self.get_client_with_auth().post('/api/user/create', data={"format": "json", "name": "user test 01", "lastname": "lastname 01", "school": "test school 01", "city": "test city 01", "country": "test country 01" })
        self.assertEqual(resp.status_code, 201)

    def test_user_update_by_api(self):
        user = User.objects.get(name="User 01")
        resp = self.get_client_with_auth().put('/api/user/update/' + str(user.id), data={"format": "json", "name": "upd user test 01", "lastname": "upd lastname 01", "school": "upd test school 01", "city": "upd test city 01", "country": "upd test country 01" })
        self.assertEqual(resp.status_code, 200)
    
    def test_user_delete(self):
        user = User.objects.get(name="User 01")
        resp = self.get_client_with_auth().delete('/api/user/delete/' + str(user.id))
        self.assertEqual(resp.status_code, 200)

