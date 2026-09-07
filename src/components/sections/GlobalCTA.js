import React from 'react';
import { Link } from 'react-router-dom';

const GlobalCTA = ({ isDark }) => {
  return (
    <section className={`py-24 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-orange-50 to-white'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Transform Your Content Strategy?
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of teams already using our headless WordPress solution. Start building faster, more scalable websites today.
          </p>
          <div className="mt-12 flex items-center justify-center gap-6">
            <Link to="/blog" className="rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40">
              Read Our Blog
            </Link>
            <Link to="/contact" className={`rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105 ${
              isDark 
                ? 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
            }`}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCTA;
