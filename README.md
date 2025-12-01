# 📦 Stock Management App (Gestion de Stocks)

A modern, responsive web application for managing stock inventory, built with **React** and **Django**.

![Main UI](file:///Users/mickaelnomel/.gemini/antigravity/brain/a26adaa1-5f66-4b7a-afba-69db78412cea/light_mode_ui_1764580244299.png)

## ✨ Features

### 🛡️ Authentication & Authorization
- **Secure Login/Register**: JWT-based authentication.
- **Role-Based Access Control (RBAC)**:
    - **Admin**: Full access (Manage users, products, categories).
    - **Manager**: Can create, edit, and delete products/categories.
    - **Reader**: Read-only access (can only view stocks).
- **Protected Routes**: Automatic redirection for unauthorized access.

### 📊 Inventory Management
- **Products**: Create, Read, Update, Delete (CRUD) products with images, prices, and quantities.
- **Categories**: Organize products into categories with icons.
- **Stock Status**: Visual indicators for Low Stock and Out of Stock items.
- **Search & Filter**: Real-time search and sorting by price/name.

### 🎨 UI/UX
- **Modern Design**: Glassmorphism effects, smooth animations, and responsive layout.
- **Dark/Light Mode**: Fully supported theme switching.
- **Interactive Feedback**: Toast notifications and confirmation dialogs for critical actions.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State/Auth**: Context API, Axios (Interceptors)
- **Forms**: React Hook Form
- **UI Components**: Ionic React (Alerts), React Hot Toast
- **Icons**: Heroicons

### Backend
- **Framework**: Django
- **API**: Django REST Framework (DRF)
- **Authentication**: SimpleJWT
- **Database**: SQLite (Default) / PostgreSQL (Ready)

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create Superuser (Admin)
python manage.py createsuperuser

# Start Server
python manage.py runserver
```
*Backend runs on `http://localhost:8000`*

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
```
*Frontend runs on `http://localhost:5173`*

## 🔑 Default Roles & Permissions

| Role | View Products | Create/Edit Products | Delete Products | Manage Categories |
| :--- | :---: | :---: | :---: | :---: |
| **Reader** | ✅ | ❌ | ❌ | ❌ |
| **Manager** | ✅ | ✅ | ✅ | ✅ |
| **Admin** | ✅ | ✅ | ✅ | ✅ |

> **Note**: New users are registered as **Readers** by default. An Admin must promote them to Manager via the Django Admin Panel (`http://localhost:8000/admin`).

## 📸 Screenshots

### Dark Mode
![Dark Mode](file:///Users/mickaelnomel/.gemini/antigravity/brain/a26adaa1-5f66-4b7a-afba-69db78412cea/dark_mode_search_bar_1764580666686.png)

### Authentication
![Login Redirect](file:///Users/mickaelnomel/.gemini/antigravity/brain/a26adaa1-5f66-4b7a-afba-69db78412cea/verify_auth_flow_retry_1764585174463.webp)

---
Developed by [Mickael Nomel](https://github.com/NomelN)
