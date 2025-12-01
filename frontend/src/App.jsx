import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductFormPage } from "./pages/ProductFormPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoryFormPage } from "./pages/CategoryFormPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/*import '@ionic/react/css/structure.css';*/
import '@ionic/react/css/typography.css';

import { setupIonicReact } from '@ionic/react';

setupIonicReact();

import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <div className="container mx-auto px-4">
              <Navigation />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />

                {/* Protected Routes */}
                <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
                <Route path="/products-create" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
                <Route path="/products/:id" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
                <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
                <Route path="/categories-create" element={<ProtectedRoute><CategoryFormPage /></ProtectedRoute>} />
                <Route path="/categories/:id" element={<ProtectedRoute><CategoryFormPage /></ProtectedRoute>} />
              </Routes>
              <Toaster />
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
