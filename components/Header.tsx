import React, { useState } from 'react';
import { ArrowLeft, School } from 'lucide-react';
import { APP_LOGO } from '../constants';

interface HeaderProps {
  onBack?: () => void;
  onHome?: () => void;
  showBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBack, onHome, showBack }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm px-4 py-3 transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 w-full">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors active:scale-90 mr-1"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          
          <button 
            onClick={onHome}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Go to home"
          >
            <div className="h-10 w-10 relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-300 group-active:scale-95">
                {imageError ? (
                  <School size={22} className="text-primary-600" />
                ) : (
                  <img 
                      src={APP_LOGO} 
                      alt="PMIC Logo" 
                      className="h-full w-full object-cover"
                      onError={() => setImageError(true)}
                      referrerPolicy="no-referrer"
                  />
                )}
            </div>
            <div className="text-left">
              <h1 className="font-extrabold text-lg leading-none text-slate-800 tracking-tight group-hover:text-primary-700 transition-colors">
                PMIC
              </h1>
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider group-hover:text-primary-500 transition-colors">Adulteration Checker</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;