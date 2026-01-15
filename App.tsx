import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import { SelectFoodScreen } from './components/SelectFoodScreen';
import { SelectAdulterantScreen } from './components/SelectAdulterantScreen';
import { TestDetailsScreen } from './components/TestDetailsScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { AppScreen, FoodItem, Adulterant, TestProcedure, FavoriteItem } from './types';
import { APP_LOGO } from './constants';
import { School, FlaskConical, ArrowRight, Heart } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedAdulterant, setSelectedAdulterant] = useState<Adulterant | null>(null);
  const [activeTest, setActiveTest] = useState<TestProcedure | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [logoError, setLogoError] = useState(false);

  // Load Favorites on Mount
  useEffect(() => {
    const saved = localStorage.getItem('pmic_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save Favorites on Change
  useEffect(() => {
    localStorage.setItem('pmic_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Navigation Handlers
  const handleBack = () => {
    switch (currentScreen) {
      case AppScreen.SELECT_FOOD:
        setCurrentScreen(AppScreen.HOME);
        break;
      case AppScreen.SELECT_ADULTERANT:
        setCurrentScreen(AppScreen.SELECT_FOOD);
        break;
      case AppScreen.TEST_DETAILS:
        if (selectedFood && selectedAdulterant) {
             setCurrentScreen(AppScreen.SELECT_ADULTERANT);
        } else {
             setCurrentScreen(AppScreen.FAVORITES);
        }
        break;
      case AppScreen.FAVORITES:
        setCurrentScreen(AppScreen.HOME);
        break;
      default:
        setCurrentScreen(AppScreen.HOME);
    }
  };

  const handleStart = () => setCurrentScreen(AppScreen.SELECT_FOOD);
  const handleGoToFavorites = () => setCurrentScreen(AppScreen.FAVORITES);

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setCurrentScreen(AppScreen.SELECT_ADULTERANT);
  };

  const handleCustomFoodProceed = (name: string) => {
    // Disabled in offline mode
  };

  const handleAdulterantSelect = (adulterant: Adulterant) => {
    setSelectedAdulterant(adulterant);
    // In offline mode, the test is always available in the constant data
    setActiveTest(null); // Set to null initially to show the "View Experiment" start screen
    setCurrentScreen(AppScreen.TEST_DETAILS);
  };

  const handleCustomAdulterantProceed = (name: string) => {
    // Disabled in offline mode
  };

  const handleShowTest = () => {
    if (selectedAdulterant?.test) {
        setActiveTest(selectedAdulterant.test);
    }
  };

  // Favorites Logic
  const getFavoriteId = (fName: string, aName: string) => `${fName.toLowerCase()}_${aName.toLowerCase()}`;

  const toggleFavorite = () => {
    if (!selectedFood || !selectedAdulterant || !activeTest) return;

    const id = getFavoriteId(selectedFood.name, selectedAdulterant.name);
    const exists = favorites.some(f => f.id === id);

    if (exists) {
      setFavorites(prev => prev.filter(f => f.id !== id));
    } else {
      const newItem: FavoriteItem = {
        id,
        foodName: selectedFood.name,
        adulterantName: selectedAdulterant.name,
        test: activeTest,
        timestamp: Date.now()
      };
      setFavorites(prev => [newItem, ...prev]);
    }
  };

  const isCurrentFavorite = () => {
    if (!selectedFood || !selectedAdulterant) return false;
    const id = getFavoriteId(selectedFood.name, selectedAdulterant.name);
    return favorites.some(f => f.id === id);
  };

  const handleSelectFavorite = (item: FavoriteItem) => {
    // Reconstruct lightweight objects for context
    setSelectedFood({ id: 'fav_food', name: item.foodName, adulterants: [] });
    setSelectedAdulterant({ id: 'fav_adj', name: item.adulterantName });
    setActiveTest(item.test);
    setCurrentScreen(AppScreen.TEST_DETAILS);
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  // --- Render Screens ---

  const renderHomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center animate-slide-up">
      <div className="relative mb-10 group">
        {/* Minimal shadow circle: rounded-full with specific shadow */}
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.08)] border-[6px] border-white relative z-10 overflow-hidden transform transition-transform duration-500 hover:scale-105">
          {logoError ? (
             <School size={64} className="text-primary-600" />
        ) : (
           <img 
             src={APP_LOGO} 
             alt="PMIC Logo" 
             className="w-full h-full object-cover" 
             onError={() => setLogoError(true)}
             referrerPolicy="no-referrer"
           />
        )}
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-slate-100 z-20">
            <FlaskConical className="text-primary-500 w-6 h-6" />
        </div>
      </div>
      
      <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
        Pure or <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-600">Impure?</span>
      </h2>
      
      <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-8 shadow-sm">
        <p className="text-primary-700 font-bold text-sm tracking-wide uppercase">
          Pioneer Montessori Inter College
        </p>
      </div>
      
      <p className="text-slate-600 text-lg mb-10 max-w-xs leading-relaxed">
        Empowering students with simple scientific experiments to ensure food safety.
      </p>
      
      <div className="w-full max-w-sm space-y-4">
        <Button onClick={handleStart} fullWidth className="text-lg py-4 shadow-xl shadow-primary-500/20 group">
          <span className="flex items-center justify-center gap-2">
            Start Experiment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
        
        <Button onClick={handleGoToFavorites} fullWidth variant="secondary" className="text-lg py-4 shadow-lg shadow-sky-500/10 group bg-white border border-slate-100 !bg-none !text-slate-600 hover:!bg-slate-50 hover:!text-primary-600">
        <span className="flex items-center justify-center gap-2">
            <Heart size={20} className="group-hover:text-red-500 transition-colors" /> Favorites
        </span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 font-sans flex flex-col">
      <Header 
        showBack={currentScreen !== AppScreen.HOME} 
        onBack={handleBack} 
      />
      <main className="w-full flex-grow flex flex-col">
        {currentScreen === AppScreen.HOME && renderHomeScreen()}
        
        {currentScreen === AppScreen.FAVORITES && (
        <FavoritesScreen 
            favorites={favorites}
            onSelect={handleSelectFavorite}
            onRemove={handleRemoveFavorite}
            onBack={() => setCurrentScreen(AppScreen.HOME)}
        />
        )}

        {currentScreen === AppScreen.SELECT_FOOD && (
        <SelectFoodScreen 
            onSelect={handleFoodSelect} 
            onCustomProceed={handleCustomFoodProceed} 
        />
        )}
        
        {currentScreen === AppScreen.SELECT_ADULTERANT && (
        <SelectAdulterantScreen
            selectedFood={selectedFood}
            onSelect={handleAdulterantSelect}
            onCustomProceed={handleCustomAdulterantProceed}
        />
        )}
        
        {currentScreen === AppScreen.TEST_DETAILS && (
        <TestDetailsScreen
            activeTest={activeTest}
            selectedFood={selectedFood}
            selectedAdulterant={selectedAdulterant}
            isGenerating={false}
            aiError={null}
            onGenerateAI={handleShowTest}
            isFavorite={isCurrentFavorite()}
            onToggleFavorite={toggleFavorite}
        />
        )}
      </main>
      
      <footer className="py-8 text-center bg-transparent">
         <p className="text-slate-400 text-xs font-semibold tracking-wide">
           Made with ❤️ by Sumit Maurya
         </p>
      </footer>
    </div>
  );
};

export default App;