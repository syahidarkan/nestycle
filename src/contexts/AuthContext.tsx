import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { User, AuthContextType } from '../types';
import { TOKEN_EXPIRY } from '../utils/constants';
import { initializeLocalStorage } from '../utils/seedData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize localStorage with seed data if empty
    initializeLocalStorage();

    // Check for existing session
    const token = localStorage.getItem('auth_token');
    const currentUser = localStorage.getItem('current_user');

    if (token && currentUser) {
      try {
        const decodedToken = JSON.parse(atob(token));
        const tokenExpiry = decodedToken.exp;

        if (Date.now() < tokenExpiry) {
          setUser(JSON.parse(currentUser));
        } else {
          // Token expired
          localStorage.removeItem('auth_token');
          localStorage.removeItem('current_user');
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const usersData = localStorage.getItem('users');
    if (!usersData) {
      throw new Error('No users found');
    }

    const users: User[] = JSON.parse(usersData);
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Create JWT-like token
    const token = btoa(
      JSON.stringify({
        userId: foundUser.id,
        exp: Date.now() + TOKEN_EXPIRY,
      })
    );

    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const register = async (
    userData: Omit<User, 'id' | 'createdAt' | 'qrCode'>
  ): Promise<void> => {
    const usersData = localStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    // Check if email already exists
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser: User = {
      ...userData,
      id: uuidv4(),
      createdAt: Date.now(),
      ...(userData.role === 'customer' && {
        points: 0,
        qrCode: btoa(
          JSON.stringify({
            id: uuidv4(),
            name: userData.name,
            phone: userData.phone,
          })
        ),
      }),
      ...(userData.role === 'mitra' && {
        commission: 0,
      }),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after registration
    await login(userData.email, userData.password);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('current_user', JSON.stringify(updatedUser));

    // Update in users array
    const usersData = localStorage.getItem('users');
    if (usersData) {
      const users: User[] = JSON.parse(usersData);
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };
const refreshUser = () => {    const currentUserData = localStorage.getItem('current_user');    if (currentUserData) {      const refreshedUser = JSON.parse(currentUserData);      setUser(refreshedUser);    }  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
