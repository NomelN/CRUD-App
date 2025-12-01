from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Category, Product


# Unregister the default User admin
admin.site.unregister(User)


# Custom User admin to show last_login
@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'last_login', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    readonly_fields = ('last_login', 'date_joined')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'quantity', 'sold_quantity', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    list_editable = ('price', 'quantity', 'sold_quantity')