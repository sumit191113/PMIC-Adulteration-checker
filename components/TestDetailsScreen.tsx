import React, { useState, useEffect } from 'react';
import Button from './Button';
import { TestProcedure, Adulterant, FoodItem } from '../types';
import { 
  CheckCircle2, 
  Beaker, 
  Eye, 
  ShieldAlert, 
  BookOpen, 
  Sparkles, 
  Loader2,
  Share2,
  Download,
  Heart,
  Microscope,
  FlaskConical
} from 'lucide-react';
import { jsPDF } from "jspdf";
import { APP_LOGO } from '../constants';

interface TestDetailsScreenProps {
  activeTest: TestProcedure | null;
  selectedFood: FoodItem | null;
  selectedAdulterant: Adulterant | null;
  isGenerating: boolean;
  aiError: string | null;
  onGenerateAI: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const TestDetailsScreen: React.FC<TestDetailsScreenProps> = ({ 
  activeTest, 
  selectedFood, 
  selectedAdulterant, 
  isGenerating, 
  aiError, 
  onGenerateAI,
  isFavorite, 
  onToggleFavorite
}) => {
  
  // Progress Simulation State
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Initializing experiment parameters...",
    "Analyzing food composition...",
    "Scanning for potential chemical reactions...",
    "Consulting scientific database...",
    "Formulating safety precautions...",
    "Finalizing test procedure..."
  ];

  useEffect(() => {
    let progressInterval: any;
    let textInterval: any;

    if (isGenerating) {
      setProgress(0);
      setLoadingStep(0);

      // Simulate Progress Bar
      progressInterval = setInterval(() => {
        setProgress(prev => {
          // Fast at first, slows down at the end to wait for API
          const remaining = 100 - prev;
          const increment = Math.max(0.1, Math.random() * (remaining / 10)); 
          const next = prev + increment;
          return next >= 98 ? 98 : next;
        });
      }, 150);

      // Cycle text messages
      textInterval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 1500);

    } else {
      setProgress(0);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isGenerating]);

  const handleShare = async () => {
    if (!activeTest || !selectedFood) return;
    
    const text = `🔬 Food Adulteration Test\n\nChecking: ${selectedFood.name}\nSuspect: ${selectedAdulterant?.name}\n\nAim: ${activeTest.aim}\nResult: ${activeTest.conclusion}\n\nGet the app to learn more!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PMIC Adulteration Test',
          text: text,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Test details copied to clipboard!');
    }
  };

  const handleDownloadPDF = async () => {
    if (!activeTest || !selectedFood || !selectedAdulterant) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    let y = 20;

    const addLogoToPdf = async (): Promise<void> => {
        try {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = APP_LOGO;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            const logoSize = 24;
            doc.addImage(img, 'PNG', pageWidth/2 - (logoSize/2), y, logoSize, logoSize);
            y += logoSize + 10;
        } catch (e) {
            console.warn("Could not add logo to PDF due to CORS or load error.", e);
        }
    };

    await addLogoToPdf();

    const checkPageBreak = (heightNeeded: number) => {
      if (y + heightNeeded > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(22, 163, 74);
    doc.text("PMIC Adulteration Test", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59);
    doc.text(`Detecting ${selectedAdulterant.name} in ${selectedFood.name}`, pageWidth / 2, y, { align: "center" });
    y += 15;
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    const renderSection = (title: string, body: string | string[], color: [number, number, number] = [0, 0, 0], isNumbered: boolean = false) => {
       doc.setFont("helvetica", "bold");
       doc.setFontSize(12);
       doc.setTextColor(...color);
       
       checkPageBreak(15);
       doc.text(title.toUpperCase(), margin, y);
       y += 7;

       doc.setFont("helvetica", "normal");
       doc.setFontSize(11);
       doc.setTextColor(51, 65, 85);

       const lineHeight = 6;
       
       if (Array.isArray(body)) {
          body.forEach((item, index) => {
             const prefix = isNumbered ? `${index + 1}. ` : `• `;
             const lines = doc.splitTextToSize(`${prefix}${item}`, maxLineWidth);
             checkPageBreak(lines.length * lineHeight + 2);
             doc.text(lines, margin, y);
             y += lines.length * lineHeight + 2;
          });
       } else {
          const lines = doc.splitTextToSize(body, maxLineWidth);
          checkPageBreak(lines.length * lineHeight);
          doc.text(lines, margin, y);
          y += lines.length * lineHeight;
       }
       y += 8;
    };

    renderSection("Aim / Object", activeTest.aim, [21, 128, 61]);
    renderSection("Materials Required", activeTest.materials, [14, 165, 233]);
    renderSection("Procedure", activeTest.procedure, [147, 51, 234], true);
    renderSection("Observation", activeTest.observation, [29, 78, 216]);
    renderSection("Conclusion", activeTest.conclusion, [21, 128, 61]);
    renderSection("Precautions", activeTest.precautions, [180, 83, 9]);

    y += 5;
    checkPageBreak(20);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by PMIC Adulteration Checker app.", pageWidth / 2, y, { align: "center" });
    doc.text("Pioneer Montessori Inter College", pageWidth / 2, y + 5, { align: "center" });

    doc.save(`PMIC_Test_${selectedFood.name.replace(/\s+/g, '_')}.pdf`);
  };

  // -------------------------------------------------------------------------
  // START SCREEN: Displayed before the test is generated
  // -------------------------------------------------------------------------
  if (!activeTest) {

    // Improved Loading Screen
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center animate-fade-in py-12">
          {/* Animated Loader Circle */}
          <div className="relative mb-8 w-40 h-40">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-t-primary-500 border-r-primary-500 border-b-transparent border-l-transparent rounded-full animate-spin"
              style={{ animationDuration: '1.5s' }}
            ></div>
            
            {/* Inner Content */}
            <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
               <span className="text-3xl font-bold text-slate-800 tabular-nums">
                 {Math.round(progress)}<span className="text-lg text-primary-500">%</span>
               </span>
            </div>

            {/* Orbiting particles */}
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '3s' }}>
              <div className="absolute -top-1 left-1/2 -ml-1 w-3 h-3 bg-science-blue rounded-full shadow-lg shadow-science-blue/50"></div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2 animate-pulse">
            Generating Experiment
          </h3>
          
          <div className="h-6 overflow-hidden mb-8">
            <p className="text-slate-500 text-sm font-medium transition-all duration-300 transform">
              {loadingMessages[loadingStep]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="mt-8 text-xs text-slate-400 max-w-xs mx-auto">
            AI is analyzing {selectedFood?.name} and designing a safe procedure to detect {selectedAdulterant?.name}.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-fade-in py-12">
        
        {/* Animated Icon */}
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary-200 blur-xl opacity-40 rounded-full animate-pulse-slow"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-white to-primary-50 rounded-full flex items-center justify-center shadow-lg border border-primary-100 relative z-10">
               <Sparkles size={40} className="text-primary-600 drop-shadow-sm" />
            </div>
            {/* Decorative dots */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-science-blue rounded-full animate-bounce"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-science-amber rounded-full animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="mb-2 space-y-1">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experiment Setup</div>
             <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
               {selectedFood?.name}
             </h2>
             <div className="flex items-center justify-center gap-2 text-primary-600 font-medium bg-primary-50 py-1 px-3 rounded-full inline-flex mt-2">
                <ShieldAlert size={14} /> 
                <span>Check for {selectedAdulterant?.name}</span>
             </div>
        </div>

        <p className="text-slate-500 my-8 max-w-xs leading-relaxed text-sm">
          Our AI will analyze this combination and generate a verified, step-by-step scientific procedure for you to perform safely.
        </p>

        {/* Action Button */}
        <div className="w-full max-w-sm">
          <Button 
                onClick={onGenerateAI} 
                fullWidth 
                className="py-4 text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={20} /> 
                <span>Generate Test</span>
              </div>
            </Button>
          {aiError && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2 text-left">
                <ShieldAlert size={16} className="shrink-0" />
                {aiError}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // RESULT SCREEN: Displayed after test is generated
  // -------------------------------------------------------------------------
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto pb-20 animate-fade-in">
      <div className="mb-6 flex justify-between items-start">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full mb-2 border border-primary-100">
                <Beaker size={14} /> Experiment Generated
            </div>
            <h2 className="text-2xl font-bold text-slate-800 leading-snug pr-4">
                Detecting {selectedAdulterant?.name} in {selectedFood?.name}
            </h2>
        </div>
        <button 
          onClick={onToggleFavorite}
          className={`p-3 rounded-full transition-all duration-300 shadow-sm border ${isFavorite ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white text-slate-300 border-slate-100 hover:text-red-400 hover:bg-red-50'}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={24} className={isFavorite ? 'fill-red-500' : ''} />
        </button>
      </div>

      <div className="space-y-6">
          {/* AIM */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-3 text-primary-700 font-bold uppercase text-xs tracking-wider">
                  <CheckCircle2 size={16} /> Aim / Object
              </div>
              <p className="text-slate-700 leading-relaxed">{activeTest.aim}</p>
          </section>

           {/* MATERIALS */}
           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-3 text-science-blue font-bold uppercase text-xs tracking-wider">
                  <Beaker size={16} /> Materials Required
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-science-blue">
                  {activeTest.materials.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
          </section>

          {/* PROCEDURE */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold uppercase text-xs tracking-wider">
                  <BookOpen size={16} /> Procedure
              </div>
              <ol className="list-decimal list-inside space-y-4 text-slate-700 marker:font-bold marker:text-purple-400">
                  {activeTest.procedure.map((p, i) => (
                    <li key={i} className="pl-2">
                        <span className="text-slate-700 leading-relaxed">{p}</span>
                    </li>
                  ))}
              </ol>
          </section>

           {/* OBSERVATION */}
           <section className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold uppercase text-xs tracking-wider">
                  <Eye size={16} /> Observation
              </div>
              <p className="text-slate-800 font-medium leading-relaxed">{activeTest.observation}</p>
          </section>

          {/* CONCLUSION */}
          <section className="bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl border border-green-100">
              <div className="flex items-center gap-2 mb-3 text-green-700 font-bold uppercase text-xs tracking-wider">
                  <CheckCircle2 size={16} /> Conclusion
              </div>
              <p className="text-slate-800 font-medium leading-relaxed">{activeTest.conclusion}</p>
          </section>

          {/* PRECAUTIONS */}
          <section className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-2xl border border-amber-100">
              <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold uppercase text-xs tracking-wider">
                  <ShieldAlert size={16} /> Precautions
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-800 text-sm marker:text-amber-500">
                  {activeTest.precautions.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
          </section>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
             <Button 
                onClick={handleShare} 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2 rounded-xl"
             >
                <Share2 size={18} /> Share
             </Button>
             <Button 
                onClick={handleDownloadPDF} 
                className="flex-1 flex items-center justify-center gap-2 rounded-xl"
             >
                <Download size={18} /> Save PDF
             </Button>
          </div>
      </div>
    </div>
  );
};