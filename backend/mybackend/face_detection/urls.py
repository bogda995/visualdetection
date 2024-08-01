# face_detection/urls.py
from django.urls import path
from .views import FaceDetectionView, index

urlpatterns = [
    path('', index, name='index'),
    path('detect/', FaceDetectionView.as_view(), name='detect'),
]
