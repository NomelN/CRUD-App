from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, RegisterView, CurrentUserView, StatsView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("api/v1/auth/register/", RegisterView.as_view(), name="register"),
    path("api/v1/auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/v1/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/auth/me/", CurrentUserView.as_view(), name="current_user"),
    path("api/v1/stats/", StatsView.as_view(), name="stats"),
]