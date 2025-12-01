from django.shortcuts import render
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum, Count, F
from .serializer import ProductSerializer, CategorySerializer
from .models import Product, Category
from .permissions import IsManager, IsAdmin, IsReader

# Auth Views
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        
        if not username or not password:
            return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
        user = User.objects.create_user(username=username, password=password, email=email)
        
        # Default group: Reader
        reader_group, _ = Group.objects.get_or_create(name='Reader')
        user.groups.add(reader_group)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'roles': [g.name for g in user.groups.all()]
            }
        }, status=status.HTTP_201_CREATED)

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'roles': [g.name for g in user.groups.all()]
        })

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsManager]

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsManager]

class StatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Key Metrics
        total_products = Product.objects.count()
        total_stock_value = Product.objects.aggregate(
            total_value=Sum(F('price') * F('quantity'))
        )['total_value'] or 0
        
        low_stock_count = Product.objects.filter(quantity__lt=5).count()
        out_of_stock_count = Product.objects.filter(quantity=0).count()

        # Charts Data
        
        # 1. Stock by Category (Top 5)
        category_distribution_query = Product.objects.values('category__name').annotate(
            count=Count('id'),
            value=Sum(F('price') * F('quantity'))
        ).order_by('-value')[:5]  # Limit to top 5 categories
        
        category_distribution = [
            {
                'category__name': item['category__name'] or 'Uncategorized',
                'count': item['count'],
                'value': item['value']
            }
            for item in category_distribution_query
        ]

        # 2. Top Selling Products (Mocked logic if no sales data yet, otherwise use sold_quantity)
        top_products = Product.objects.order_by('-sold_quantity')[:5]
        top_products_data = [
            {
                'name': p.name,
                'sold': p.sold_quantity,
                'revenue': p.sold_quantity * p.price
            } for p in top_products
        ]

        # 3. Stock Evolution (Mocked for now as we don't have history)
        stock_evolution = [
            {'month': 'Jan', 'value': 4000},
            {'month': 'Feb', 'value': 3000},
            {'month': 'Mar', 'value': 2000},
            {'month': 'Apr', 'value': 2780},
            {'month': 'May', 'value': 1890},
            {'month': 'Jun', 'value': 2390},
            {'month': 'Jul', 'value': 3490},
        ]

        return Response({
            'metrics': {
                'total_products': total_products,
                'total_stock_value': round(total_stock_value, 2),
                'low_stock_count': low_stock_count,
                'out_of_stock_count': out_of_stock_count,
            },
            'charts': {
                'category_distribution': category_distribution,
                'top_products': top_products_data,
                'stock_evolution': stock_evolution
            }
        })