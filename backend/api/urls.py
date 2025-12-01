from django.urls import path, include
from rest_framework.documentation import include_docs_urls 
from rest_framework import routers
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'products', views.ProductView, 'products')
router.register(r'categories', views.CategoryView, 'categories')


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Products Api Rest")),
    
    # Auth Endpoints
    path('api/v1/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/register/', views.RegisterView.as_view(), name='auth_register'),
    path('api/v1/auth/me/', views.CurrentUserView.as_view(), name='auth_me'),
]