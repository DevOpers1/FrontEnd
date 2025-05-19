from django.http import JsonResponse, HttpResponse,  HttpResponseBadRequest
from django.views.decorators.http import require_GET
from . models import User, Exercise, Trainer, PersonalPlan, ExercisesInPlans
import json
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.db.models import Max
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib.parse import unquote
from rest_framework import status
import requests as http_requests
from .models import User  # Імпортуємо свою модель User
from google.oauth2 import id_token
from google.auth.transport import requests
from django.http import JsonResponse
import logging
from django.conf import settings
from django.contrib.auth import get_user_model
import traceback
from django.shortcuts import render
from django.http import HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt




logger = logging.getLogger(__name__)
logger.error('Your log message here')
User = get_user_model()


GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo"
CLIENT_ID = settings.GOOGLE_CLIENT_ID

@require_GET
def get_users(request):
    try:
        # Отримуємо всіх користувачів з БД
        users = User.objects.all()
        
        # Формуємо список користувачів у JSON-форматі
        users_data = []
        for user in users:
            users_data.append({
                'user_id': user.user_id,
                'login': user.login,
                'email': user.email,
                'age': user.age,
                'weight': user.weight,
                'height': user.height,
                'settings_id': user.settings_id
            })
        
        # Повертаємо відповідь у JSON форматі
        return JsonResponse({
            'success': True,
            'users': users_data,
            'count': len(users_data)
        }, status=200)
    
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
    
def exercise_by_name(request, exercise_name):
    try:
        # Пошук вправи (нечутливий до регістру)
        exercise = get_object_or_404(Exercise, name__iexact=exercise_name)
        print(f"Exercise found: {exercise.name}, Instructions: {exercise.instructions}")

        # Рендеринг HTML для знайденої вправи
        return render(request, 'api/exercise_detail.html', {
            'exercise': exercise,
            'similar_exercises': []
        })
        
    except Http404:
        # Якщо вправу не знайдено - шукаємо схожі
        similar_exercises = Exercise.objects.filter(
            name__icontains=exercise_name
        ).exclude(name__iexact=exercise_name).values_list('name', flat=True)[:5]
        
        return render(request, 'api/exercise_not_found.html', {
            'exercise_name': exercise_name,
            'similar_exercises': similar_exercises
        }, status=404)
    
def exercise_list(request):
    try:
        exercises = Exercise.objects.all()
        return render(request, 'api/exercise_detail.html', {'exercises': exercises})
    except Exception as e:
        print(f"[ERROR] Failed to load exercises: {e}")
        return HttpResponseServerError("Internal Server Error")

def get_user_by_email(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'success': False, 'message': 'Email parameter is required'}, status=400)
    
    try:
        user = get_object_or_404(User, email=email)
        
        user_data = {
            'success': True,
            'user': {
                'user_id': user.user_id,
                'login': user.login,
                'email': user.email,
                'age': user.age,
                'weight': user.weight,
                'height': user.height,
                'settings_id': user.settings_id
            }
        }
        
        return JsonResponse(user_data, status=200)
    
    except Http404:
        return JsonResponse({
            'success': False,
            'message': f'Користувача з email {email} не знайдено',
            'suggestion': 'Ви можете створити нового користувача'
        }, status=404)
    
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)
    
@csrf_exempt  # Дозволяємо запити без CSRF-токена для API (у реальному проекті варто використовувати захист)
@require_POST  # Дозволяємо тільки POST-запити
def create_user(request):
    try:
        # Отримуємо дані з тіла запиту
        data = json.loads(request.body)
        
        # Перевіряємо обов'язкові поля
        required_fields = ['login', 'email', 'age', 'weight', 'height']
        for field in required_fields:
            if field not in data:
                return JsonResponse({
                    'success': False,
                    'message': f'Поле {field} є обов\'язковим'
                }, status=400)
        
        # Перевіряємо, чи існує користувач з таким email
        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({
                'success': False,
                'message': 'Користувач з таким email вже існує'
            }, status=400)
        
        # Створюємо нового користувача
        user = User.objects.create(
            login=data['login'],
            email=data['email'],
            age=data['age'],
            weight=data['weight'],
            height=data['height'],
            settings_id=data.get('settings_id', None)  # Необов'язкове поле
        )
        
        # Формуємо відповідь з даними створеного користувача
        return JsonResponse({
            'success': True,
            'message': 'Користувача успішно створено',
            'user': {
                'user_id': user.user_id,
                'login': user.login,
                'email': user.email,
                'age': user.age,
                'weight': user.weight,
                'height': user.height,
                'settings_id': user.settings_id
            }
        }, status=201)
    
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Невірний формат JSON'
        }, status=400)
    
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)   

@csrf_exempt
def create_user_form(request):
    if request.method == 'POST':
        try:
            # Отримуємо дані з форми
            login = request.POST.get('login')
            email = request.POST.get('email')
            age = request.POST.get('age')
            weight = request.POST.get('weight')
            height = request.POST.get('height')
            
            # Перевіряємо обов'язкові поля
            if not all([login, email, age, weight, height]):
                return render(request, 'api/create_user.html', {
                    'success': False,
                    'message': 'Будь ласка, заповніть всі обов\'язкові поля'
                })
            
            # Перевіряємо email
            if User.objects.filter(email=email).exists():
                return render(request, 'api/create_user.html', {
                    'success': False,
                    'message': 'Користувач з таким email вже існує'
                })
            
            # Отримуємо наступний settings_id (якщо потрібно)
            max_settings_id = User.objects.aggregate(Max('settings_id'))['settings_id__max'] or 0
            new_settings_id = max_settings_id + 1
            max_user_id = User.objects.aggregate(Max('user_id'))['user_id__max'] or 0
            new_user_id = max_user_id + 1
            
            user = User.objects.create(
                login=login,
                email=email,
                age=int(age),
                weight=float(weight),
                height=int(height),
                settings_id=new_settings_id,
                user_id=new_user_id
            )

            return render(request, 'api/create_user.html', {
                'success': True,
                'message': f'Користувача {login} успішно створено! ID: {user.pk}'
            })
            
        except Exception as e:
            return render(request, 'api/create_user.html', {
                'success': False,
                'message': f'Помилка: {str(e)}'
            })
    
    return render(request, 'api/create_user.html')

@require_GET
def trainer_list(request):
    trainers = Trainer.objects.all()
    return render(request, 'api/trainer_list.html', {
        'trainers': trainers
    })
@require_GET  
def trainer_by_name(request, trainer_name):
    try:
        # Пошук вправи (нечутливий до регістру)
        trainer = get_object_or_404(Trainer, name__iexact=trainer_name)
        print(f"Trainer found: {trainer.name}, Instructions: {trainer.description}")

        # Рендеринг HTML для знайденого тренажера
        return render(request, 'api/trainer_detail.html', {
            'trainer': trainer,
            'similar_trainers': []
        })
        
    except Http404:
        # Якщо тренажер не знайдено - шукаємо схожі
        similar_trainers = Trainer.objects.filter(
            name__icontains=trainer_name
        ).exclude(name__iexact=trainer_name).values_list('name', flat=True)[:5]
        
        return render(request, 'api/trainer_not_found.html', {
            'trainer_name': trainer_name,
            'similar_trainers': similar_trainers
        }, status=404)

@require_GET
def personal_plan_list(request):
    plans = PersonalPlan.objects.all()
    return render(request, 'api/personal_plan_list.html', {
        'plans': plans
    })


@require_GET
def personal_plan_detail(request, name):
    plan = get_object_or_404(PersonalPlan, name=name)

    # Отримуємо всі зв'язки вправ для плану
    exercises_in_plan = ExercisesInPlans.objects.filter(plan=plan).select_related('exercise')

    # Готуємо список вправ з кількістю повторень
    exercises_list = []
    for item in exercises_in_plan:
        exercises_list.append({
            'exercise_name': item.exercise.name,
            'number_of_repetitions': item.number_of_repetitions
        })

    # Формуємо фінальну відповідь
    plan_data = {
        'name': plan.name,
        'description': plan.description,
        'goal': plan.goal,
        'training_frequency': plan.training_frequency,
        'notes': plan.notes,
        'exercises': exercises_list
    }

    return JsonResponse(plan_data)
@csrf_exempt
def google_auth(request):
    """
    Authenticate user using Google OAuth2 token
    """
    # Отримуємо токен з тіла запиту
    token = request.data.get('id_token')
    if not token:
        logger.error('Google auth: Missing token in request')
        return Response(
            {'success': False, 'error': 'ID token is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Валідуємо токен з усіма необхідними перевірками
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=60  # Допустимий часовий зсув
        )

        # Додаткові перевірки токена
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Invalid issuer')

        if idinfo['aud'] != settings.GOOGLE_CLIENT_ID:
            raise ValueError('Invalid audience')

        # Отримуємо email з токена
        email = idinfo.get('email')
        if not email:
            raise ValueError('Email not found in token')

        # Перевіряємо наявність користувача в базі
        user_exists = User.objects.filter(email=email).exists()
        
        logger.info(f'Google auth successful for email: {email}')
        
        return Response({
            'success': True,
            'email': email,
            'user_exists': user_exists,
            'name': idinfo.get('name', ''),
            'picture': idinfo.get('picture', '')
        }, status=status.HTTP_200_OK)

    except ValueError as e:
        logger.error(f'Google token validation failed: {str(e)}')
        return Response(
            {'success': False, 'error': 'Invalid token: ' + str(e)},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        logger.error(f'Google auth error: {str(e)}', exc_info=True)
        return Response(
            {'success': False, 'error': 'Authentication failed'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )