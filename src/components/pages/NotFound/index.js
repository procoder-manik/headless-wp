import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ isDark }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && (
          <>
            <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">🚀</div>
            <div className="absolute top-32 right-16 text-5xl animate-float animation-delay-2000 opacity-20">✨</div>
            <div className="absolute bottom-32 left-20 text-4xl animate-float animation-delay-4000 opacity-20">🪐</div>
            <div className="absolute bottom-20 right-24 text-5xl animate-float opacity-20">🌟</div>
            <div className="absolute top-40 left-1/3 text-4xl animate-float animation-delay-3000 opacity-20">💫</div>
            <div className="absolute bottom-40 right-1/3 text-5xl animate-float animation-delay-2000 opacity-20">🛸</div>
            <div className="absolute top-1/4 right-10 text-4xl animate-float animation-delay-4000 opacity-20">🌙</div>
            <div className="absolute bottom-1/4 left-10 text-5xl animate-float animation-delay-3000 opacity-20">☄️</div>
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Animated 404 Text */}
        <div className="mb-6">
          <h1 className={`text-9xl font-bold tracking-tighter ${
            isDark 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600'
          }`}>
            404
          </h1>
        </div>

        {/* Floating Robot Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="text-8xl animate-bounce-slow">🤖</div>
            <div className="absolute -top-2 -right-4 text-2xl animate-pulse">💥</div>
          </div>
        </div>

        {/* Fun Message */}
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Oops! Page Not Found
        </h2>
        
        <p className={`text-lg mb-2 max-w-md mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Looks like our robot wandered off into space. This page doesn't exist.
        </p>
        
        <p className={`text-sm mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Don't worry, even robots get lost sometimes. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
          >
            <span>🚀</span>
            <span>Take Me Home</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-gray-600' 
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <span>←</span>
            <span>Go Back</span>
          </button>
        </div>

        {/* Fun Status Message */}
        <div className="mt-12 mb-16 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span>Error Code: 404 | Status: Lost in Space</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
