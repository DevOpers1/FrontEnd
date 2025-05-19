from django.urls import path
from . import views

urlpatterns = [
    # Маршрут для отримання списку користувачів
    path('users/', views.get_users, name='get-users'),
    
    # Маршрут для отримання списку вправ
    path('exercises/', views.exercise_list, name='exercise-list'),
    
    # Маршрут для отримання вправи за її назвою
    path('exercises/<str:exercise_name>/', views.exercise_by_name, name='exercise-by-name'),
    
    # Маршрут для отримання користувача за email
    path('get_user/', views.get_user_by_email, name='user-detail'),  
    
    # Маршрут для створення нового користувача
    path('users/create/', views.create_user, name='create_user'),
    
    # Форма для створення нового користувача
    path('users/create-form/', views.create_user_form, name='create_user_form'),

    path('api/auth/google/', views.google_auth, name='google_auth'),

    # Маршрут для отримання списку тренерів
    path('trainers/', views.trainer_list, name='trainer-list'),
    
    # Маршрут для отримання тренера за його ім'ям
    path('trainers/<str:trainer_name>/', views.trainer_by_name, name='trainer-by-name'),
    
    # Маршрут для отримання персональних планів
    path('plans/', views.personal_plan_list, name='personal_plan_list'),
    
    # Деталі персонального плану за його назвою
    path('plans/<str:name>/', views.personal_plan_detail, name='personal_plan_detail'),
    
    # Маршрут для авторизації через Google
    path('auth/google/', views.google_auth, name='google_auth'),
]