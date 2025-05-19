from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Settings)
admin.site.register(Trainer)
admin.site.register(Exercise)
admin.site.register(MediaFiles)
admin.site.register(PersonalPlan)
admin.site.register(PersonalUserPlans)
admin.site.register(ExercisesInPlans)
