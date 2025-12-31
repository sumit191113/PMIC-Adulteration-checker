import React from 'react';
import { FavoriteItem } from '../types';
import { Heart, Trash2, ArrowRight, Beaker } from 'lucide-react';

interface FavoritesScreenProps {
  favorites: FavoriteItem[];
  onSelect: (item: FavoriteItem) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ favorites, onSelect, onRemove, onBack }) => {
  return (
    <div className="px-4 py-8 max-w-2xl mx-auto animate-slide-up">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Heart className="fill-red-500 text-red-500" /> Favorites
          </h2>
          <p className="text-slate-500">Your saved experiments</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-300">
            <Heart size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No Favorites Yet</h3>
          <p className="text-slate-400 max-w-xs mx-auto mt-2 mb-6">
            Save experiments you want to revisit by tapping the heart icon.
          </p>
          <button 
            onClick={onBack}
            className="text-primary-600 font-bold hover:underline"
          >
            Find an Experiment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav) => (
            <div 
              key={fav.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group transition-all hover:shadow-md hover:border-primary-100 flex items-center gap-4"
            >
               <button 
                 onClick={() => onSelect(fav)}
                 className="flex-1 text-left flex items-center gap-4"
               >
                 <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors">
                    <Beaker size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800 group-hover:text-primary-700 transition-colors">
                     {fav.foodName}
                   </h3>
                   <p className="text-sm text-slate-500">
                     Check for <span className="font-medium text-amber-600">{fav.adulterantName}</span>
                   </p>
                 </div>
               </button>

               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   onRemove(fav.id);
                 }}
                 className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                 aria-label="Remove from favorites"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};