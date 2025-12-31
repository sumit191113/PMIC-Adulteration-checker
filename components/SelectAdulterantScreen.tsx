import React, { useState } from 'react';
import Button from './Button';
import { Adulterant, FoodItem } from '../types';
import { ChevronRight, Search } from 'lucide-react';

interface SelectAdulterantScreenProps {
  selectedFood: FoodItem | null;
  onSelect: (adulterant: Adulterant) => void;
  onCustomProceed: (name: string) => void;
}

export const SelectAdulterantScreen: React.FC<SelectAdulterantScreenProps> = ({ selectedFood, onSelect, onCustomProceed }) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  
  const suggestedAdulterants = selectedFood?.adulterants || [];
  const hasSuggestions = suggestedAdulterants.length > 0;

  const handleProceed = () => {
    onCustomProceed(customName);
  };

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto animate-slide-up">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Select Adulterant</h2>
        <p className="text-slate-500">
          What impurity do you suspect in <span className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-lg">{selectedFood?.name}</span>?
        </p>
      </div>

      {!isCustomMode && hasSuggestions ? (
        <>
          <div className="space-y-4 mb-8">
            {suggestedAdulterants.map((adj) => (
              <button
                key={adj.id}
                onClick={() => onSelect(adj)}
                className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-primary-500 hover:ring-1 hover:ring-primary-500 hover:shadow-md transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-primary-500 transition-colors"></div>
                  <span className="font-semibold text-lg text-slate-700 group-hover:text-primary-800 transition-colors">{adj.name}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-primary-600" />
                </div>
              </button>
            ))}
          </div>
          <Button variant="outline" fullWidth onClick={() => setIsCustomMode(true)} className="rounded-xl border-dashed text-slate-500">
             Check for something else?
          </Button>
        </>
      ) : (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
           <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Enter Adulterant Name</label>
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="e.g. Sand, Plastic, Chalk"
            className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none mb-6 transition-all text-lg"
            autoFocus
          />
           <div className="flex gap-4">
             {hasSuggestions && <Button variant="outline" onClick={() => setIsCustomMode(false)} className="flex-1">Cancel</Button>}
             <Button onClick={handleProceed} disabled={!customName.trim()} className="flex-1">Check</Button>
          </div>
        </div>
      )}
    </div>
  );
};