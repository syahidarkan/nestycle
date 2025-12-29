import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { validateName, validatePhone, validateAddress, validatePassword } from '../../utils/validation';
import { UserCircleIcon, CameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSuccess('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSaveProfile = () => {
    const nameValidation = validateName(formData.name);
    const phoneValidation = validatePhone(formData.phone);
    const addressValidation = validateAddress(formData.address);

    const newErrors = {
      ...errors,
      name: nameValidation.error || '',
      phone: phoneValidation.error || '',
      address: addressValidation.error || '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err)) return;

    updateUser(formData);
    setSuccess('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.currentPassword !== user?.password) {
      setErrors(prev => ({ ...prev, currentPassword: 'Current password is incorrect' }));
      return;
    }

    const passwordValidation = validatePassword(passwordData.newPassword);
    if (!passwordValidation.isValid) {
      setErrors(prev => ({ ...prev, newPassword: passwordValidation.error || '' }));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    updateUser({ password: passwordData.newPassword });
    setSuccess('Password changed successfully!');
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ avatar: reader.result as string });
      setSuccess('Avatar updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircleIcon className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Avatar Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
        <div className="flex items-center space-x-6">
          <div className="relative">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <UserCircleIcon className="w-24 h-24 text-gray-400" />
            )}
            <label className="absolute bottom-0 right-0 bg-primary hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer transition-colors">
              <CameraIcon className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 resize-none"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          {isEditing && (
            <div className="flex space-x-3">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ name: user.name, phone: user.phone, address: user.address });
                  setErrors({ name: '', phone: '', address: '', currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>

        {!isChangingPassword ? (
          <button
            onClick={() => setIsChangingPassword(true)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleChangePassword}
                className="flex-1 bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setErrors({ name: '', phone: '', address: '', currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
