from django.urls import path
from .views import TodoListCreateView, TodoUpdateView

urlpatterns = [
    path("", TodoListCreateView.as_view()),
    path("<int:pk>/", TodoUpdateView.as_view()),
]
