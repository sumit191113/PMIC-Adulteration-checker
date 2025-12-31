import React, { useState } from 'react';
import Button from './Button';
import { FileWarning, FileText, ChevronRight } from 'lucide-react';

interface ReportsMenuScreenProps {
  onNavigateToForm: () => void;
  onNavigateToList: () => void;
}

export const ReportsMenuScreen: React.FC<ReportsMenuScreenProps> = ({ onNavigateToForm, onNavigateToList }) => {
  return (
    <div className="px-4 py-8 max-w-2xl mx-auto animate-slide-up flex flex-col items-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-3">Adulteration Reports</h2>
      <p className="text-slate-500 mb-10 text-center max-w-sm">Submit your own findings or view reports from the community.</p>

      <div className="w-full space-y-6 max-w-md">
        <button
          onClick={onNavigateToForm}
          className="w-full bg-gradient-to-br from-red-50 to-white p-6 rounded-3xl border border-red-100 shadow-sm flex items-center justify-between hover:shadow-xl hover:shadow-red-500/5 hover:border-red-200 transition-all duration-300 group active:scale-[0.98]"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md shadow-red-100 text-red-500 group-hover:scale-110 transition-transform duration-300 border border-red-50">
              <FileWarning size={32} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl text-slate-800 mb-1">Complaint</h3>
              <p className="text-red-600/80 text-sm font-medium">Submit a new report</p>
            </div>
          </div>
          <ChevronRight className="text-red-200 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
        </button>

        <button
          onClick={onNavigateToList}
          className="w-full bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl border border-blue-100 shadow-sm flex items-center justify-between hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300 group active:scale-[0.98]"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md shadow-blue-100 text-blue-500 group-hover:scale-110 transition-transform duration-300 border border-blue-50">
              <FileText size={32} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl text-slate-800 mb-1">See Reports</h3>
              <p className="text-blue-600/80 text-sm font-medium">View community findings</p>
            </div>
          </div>
          <ChevronRight className="text-blue-200 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};