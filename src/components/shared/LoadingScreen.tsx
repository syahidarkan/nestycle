import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation after 2.5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Pulsing Circle Background */}
          <div className="absolute">
            <div className="w-48 h-48 bg-primary/10 rounded-full animate-ping"></div>
          </div>

          {/* Logo */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-48 h-48 flex items-center justify-center animate-bounce">
            <img
              src="/images/nestle-logo.png"
              alt="Nestlé Logo"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-neutral-900">
            Nestlé <span className="text-primary">Nestycle</span>
          </h1>
          <p className="text-lg text-neutral-600">
            Recycle • Earn • Redeem
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-neutral-500 mt-6 animate-fade-in">
          Program Daur Ulang Resmi Nestlé Indonesia
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
