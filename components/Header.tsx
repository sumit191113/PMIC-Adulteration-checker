import React, { useState } from 'react';
import { ArrowLeft, School } from 'lucide-react';
import { APP_LOGO } from '../constants';

interface HeaderProps {
  onBack?: () => void;
  showBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBack, showBack }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm px-4 py-3 transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors active:scale-90"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center">
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
            <div>
              <h1 className="font-extrabold text-lg leading-none text-slate-800 tracking-tight">
                PMIC
              </h1>
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Adulteration Checker</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;