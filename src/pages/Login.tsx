import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
    setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    // Validate all fields
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors = {
      email: emailValidation.error || '',
      password: passwordValidation.error || '',
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);

      // Navigation will be handled by AuthContext and ProtectedRoute
      const currentUser = JSON.parse(localStorage.getItem('current_user') || '{}');
      if (currentUser.role === 'customer') {
        navigate('/customer/dashboard');
      } else if (currentUser.role === 'mitra') {
        navigate('/mitra/dashboard');
      }
    } catch (error: any) {
      setGeneralError(error.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top Bar - Tokopedia Style */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Kembali
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          {/* Logo and Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center space-x-2 mb-4 sm:mb-6">
              <div>
                <img src="/images/nestle-logo.png" alt="Nestlé Logo" className="h-6 sm:h-8" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-neutral-900">
                Nestycle
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">Masuk ke Akun Anda</h1>
            <p className="text-sm text-neutral-600">Masukkan email dan password untuk melanjutkan</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-lg shadow-card p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* General Error */}
              {generalError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{generalError}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.email ? 'border-red-300' : 'border-neutral-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
                    placeholder="Masukkan email Anda"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.password ? 'border-red-300' : 'border-neutral-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
                    placeholder="Masukkan password Anda"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-900 mb-2">Akun Demo:</p>
              <div className="text-xs text-blue-800 space-y-1">
                <p><strong>Customer:</strong> budi@example.com / password123</p>
                <p><strong>Mitra:</strong> majujaya@example.com / password123</p>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-5 text-center">
              <p className="text-sm text-neutral-600">
                Belum punya akun?{' '}
                <Link to="/register" className="text-primary hover:text-primary-600 font-semibold">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info - Tokopedia Style */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              Dengan masuk, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
