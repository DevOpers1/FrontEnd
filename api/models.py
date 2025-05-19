from django.db import models
from django.utils import timezone
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission
)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = 'Користувач'
        verbose_name_plural = 'Користувачі'
        ordering = ['email']
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.email 

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email.split('@')[0]  # Повертає частину email до @


class Settings(models.Model):
    settings_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='user_settings'
    )
    interface_language = models.CharField(max_length=50, null=True, blank=True)
    notifications = models.BooleanField(default=True)

    def __str__(self):
        return f"Settings for {self.user.login}"


class Trainer(models.Model):
    trainer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    muscle_activity = models.TextField(null=True, blank=True)
    type = models.TextField(null=True, blank=True)
    images = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'trainer'

    def __str__(self):
        return self.name


class Exercise(models.Model):
    exercise_id = models.AutoField(primary_key=True)
    trainer = models.ForeignKey(
        Trainer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='trainer_exercises'
    )
    name = models.CharField(max_length=255)
    instructions = models.TextField(null=True, blank=True)
    video_link = models.URLField(null=True, blank=True)
    muscles = models.TextField(null=True, blank=True)
    purpose = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'exercise'

    def __str__(self):
        return self.name


class MediaFiles(models.Model):
    FORMAT_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('gif', 'GIF'),
    ]

    media_id = models.AutoField(primary_key=True)
    exercise = models.ForeignKey(
        Exercise,
        on_delete=models.CASCADE,
        related_name='exercise_media'
    )
    link = models.URLField()
    format = models.CharField(max_length=50, choices=FORMAT_CHOICES)

    def __str__(self):
        return f"Media {self.media_id} for {self.exercise.name}"


class PersonalPlan(models.Model):
    plan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    goal = models.TextField(null=True, blank=True)
    training_frequency = models.IntegerField(
        validators=[MinValueValidator(1)],
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class PersonalUserPlans(models.Model):
    plan = models.ForeignKey(
        PersonalPlan,
        on_delete=models.CASCADE,
        related_name='plan_users'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_plans'
    )

    class Meta:
        unique_together = (('plan', 'user'),)

    def __str__(self):
        return f"{self.user.login}'s plan: {self.plan.name}"


class ExercisesInPlans(models.Model):
    exercise = models.ForeignKey(
        Exercise,
        on_delete=models.CASCADE,
        related_name='exercise_plans'
    )
    plan = models.ForeignKey(
        PersonalPlan,
        on_delete=models.CASCADE,
        related_name='plan_exercises'
    )

    class Meta:
        unique_together = (('exercise', 'plan'),)

    def __str__(self):
        return f"{self.exercise.name} in {self.plan.name}"