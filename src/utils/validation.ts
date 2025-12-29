export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
    return { isValid: false, error: 'Please enter a valid Indonesian phone number' };
  }
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  return { isValid: true };
};

export const validateAddress = (address: string): ValidationResult => {
  if (!address) {
    return { isValid: false, error: 'Address is required' };
  }
  if (address.length < 10) {
    return { isValid: false, error: 'Please enter a complete address (at least 10 characters)' };
  }
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};
