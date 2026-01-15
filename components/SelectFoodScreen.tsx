import React from 'react';
import { FoodItem } from '../types';
import { FOOD_DATABASE } from '../constants';

interface SelectFoodScreenProps {
  onSelect: (food: FoodItem) => void;
  onCustomProceed: (name: string) => void;
}

export const SelectFoodScreen: React.FC<SelectFoodScreenProps> = ({ onSelect }) => {
  return (
    <div className="px-4 py-8 max-w-2xl mx-auto animate-slide-up">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Select Food Item</h2>
        <p className="text-slate-500">What do you want to test today?</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
        {FOOD_DATABASE.map((food) => (
          <button
            key={food.id}
            onClick={() => onSelect(food)}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-4 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 group active:scale-95"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:scale-110 transition-all duration-300 text-slate-400 group-hover:text-primary-600">
              {food.icon ? <food.icon size={32} /> : <div className="w-8 h-8 bg-slate-200 rounded-full" />}
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-primary-700">{food.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};