import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateAddress,
} from '../utils/validation';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import type { UserRole } from '../types';


const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    role: 'customer' as UserRole,
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
    setGeneralError('');
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const validateForm = () => {
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhone(formData.phone);
    const addressValidation = validateAddress(formData.address);
    const passwordValidation = validatePassword(formData.password);

    let confirmPasswordError = '';
    if (!formData.confirmPassword) {
      confirmPasswordError = 'Konfirmasi password Anda';
    } else if (formData.password !== formData.confirmPassword) {
      confirmPasswordError = 'Password tidak cocok';
    }

    const newErrors = {
      name: nameValidation.error || '',
      email: emailValidation.error || '',
      phone: phoneValidation.error || '',
      address: addressValidation.error || '',
      password: passwordValidation.error || '',
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);

      // Navigation will be handled after successful registration
      if (formData.role === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/mitra/dashboard');
      }
    } catch (error: any) {
      setGeneralError(error.message || 'Pendaftaran gagal. Silakan coba lagi.');
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
        <div className="max-w-2xl mx-auto px-4 py-4">
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
        <div className="max-w-2xl w-full">
          {/* Logo and Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div>
                <img src="/images/nestle-logo.png" alt="Nestlé Logo" className="h-6 sm:h-8" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-neutral-900">
                Nestycle
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">Daftar Akun Baru</h1>
            <p className="text-sm text-neutral-600">Lengkapi data di bawah untuk membuat akun</p>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white rounded-lg shadow-card p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* General Error */}
              {generalError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{generalError}</p>
                </div>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Daftar Sebagai
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('customer')}
                    className={`relative p-4 border-2 rounded-lg transition-all ${
                      formData.role === 'customer'
                        ? 'border-primary bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {formData.role === 'customer' && (
                      <CheckCircleIcon className="absolute top-2 right-2 w-5 h-5 text-primary" />
                    )}
                    <div className="text-center">
                      <UserIcon className="w-7 h-7 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-neutral-900 text-sm">Customer</p>
                      <p className="text-xs text-neutral-600 mt-1">Kumpulkan & tukar poin</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('mitra')}
                    className={`relative p-4 border-2 rounded-lg transition-all ${
                      formData.role === 'mitra'
                        ? 'border-primary bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {formData.role === 'mitra' && (
                      <CheckCircleIcon className="absolute top-2 right-2 w-5 h-5 text-primary" />
                    )}
                    <div className="text-center">
                      <svg className="w-7 h-7 mx-auto mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="font-semibold text-neutral-900 text-sm">Mitra</p>
                      <p className="text-xs text-neutral-600 mt-1">Kumpulkan & dapat komisi</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
                  {formData.role === 'mitra' ? 'Nama Usaha' : 'Nama Lengkap'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.name ? 'border-red-300' : 'border-neutral-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
                    placeholder={formData.role === 'mitra' ? 'Nama usaha Anda' : 'Nama lengkap Anda'}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
              </div>

              {/* Email and Phone - Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="email@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 mb-2">
                    No. Telepon
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.phone ? 'border-red-300' : 'border-neutral-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
                      placeholder="081234567890"
                    />
                  </div>
                  {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-900 mb-2">
                  {formData.role === 'mitra' ? 'Alamat Usaha' : 'Alamat'}
                </label>
                <div className="relative">
                  <div className="absolute top-2.5 left-0 pl-3 flex items-start pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-neutral-400" />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.address ? 'border-red-300' : 'border-neutral-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none`}
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>
                {errors.address && <p className="mt-1.5 text-xs text-red-600">{errors.address}</p>}
              </div>

              {/* Password Fields - Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="Min. 6 karakter"
                    />
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-900 mb-2">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.confirmPassword ? 'border-red-300' : 'border-neutral-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
                      placeholder="Ulangi password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
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
                    Membuat Akun...
                  </>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-5 text-center">
              <p className="text-sm text-neutral-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-primary hover:text-primary-600 font-semibold">
                  Masuk
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info - Tokopedia Style */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              Dengan mendaftar, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
