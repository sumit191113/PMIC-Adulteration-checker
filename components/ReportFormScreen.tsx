import React, { useState, useRef } from 'react';
import Button from './Button';
import { Camera, AlertTriangle, X, Calendar, Type, Tag } from 'lucide-react';
import { Report } from '../types';
import { saveReport, compressImage } from '../services/reportService';
import { isConfigured } from '../services/firebaseConfig';

interface ReportFormScreenProps {
  onSubmitSuccess: () => void;
}

export const ReportFormScreen: React.FC<ReportFormScreenProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    foodItem: '',
    adulterant: '',
    brand: '',
    purchaseDate: '',
    observation: ''
  });
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size check
      if (file.size > 10 * 1024 * 1024) {
        alert("File size is too large. Please select an image under 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawBase64 = reader.result as string;
        // Compress the image immediately so it's ready for DB
        try {
            const compressed = await compressImage(rawBase64);
            setImage(compressed);
        } catch (err) {
            console.error("Compression failed", err);
            setImage(rawBase64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReport: Report = {
      id: Date.now().toString(), // Temporary ID, backend generates real one
      reporterName: formData.name || 'Anonymous',
      foodName: formData.foodItem,
      adulterantName: formData.adulterant,
      brandName: formData.brand,
      dateOfPurchase: formData.purchaseDate,
      dateOfSubmission: new Date().toISOString(),
      observation: formData.observation,
      imageBase64: image || undefined
    };

    try {
      await saveReport(newReport);
      
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmitSuccess();
      }, 500);
    } catch (error) {
      console.error("Failed to save report", error);
      alert("Failed to save report. Please try again.");
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const InputField = ({ label, icon: Icon, ...props }: any) => (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all`}
        />
      </div>
    </div>
  );

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto animate-slide-up pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">New Complaint</h2>
        <p className="text-slate-500 text-sm">Fill in the details to report an adulterated product.</p>
        
        {!isConfigured && (
           <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100">
             <strong>Note:</strong> App is in Offline Mode. Reports will only be saved on this device until a database is configured.
           </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section: Who */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">1</span>
            Reporter Details
          </h3>
          <InputField 
            label="Your Name (Optional)" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Anonymous"
            icon={Type}
          />
        </div>

        {/* Section: What */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">2</span>
            Product Details
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField 
              required
              label="Item Name *"
              name="foodItem"
              value={formData.foodItem}
              onChange={handleInputChange}
              placeholder="e.g. Milk"
              icon={Tag}
            />
            <InputField 
              required
              label="Suspected Adulterant *"
              name="adulterant"
              value={formData.adulterant}
              onChange={handleInputChange}
              placeholder="e.g. Water"
              icon={AlertTriangle}
            />
          </div>

          <InputField 
            label="Brand Name (Optional)"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            placeholder="e.g. Brand X"
          />

          <InputField 
            type="date"
            label="Date of Purchase"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
            icon={Calendar}
          />
        </div>

        {/* Section: Evidence */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">3</span>
             Evidence & Observation
          </h3>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {!image ? (
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:border-primary-400 transition-all group mb-6"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera size={28} />
              </div>
              <div className="text-center">
                <span className="font-bold text-slate-700 block mb-1">Upload Photo</span>
                <p className="text-xs text-slate-400">Tap to capture or select from gallery</p>
              </div>
            </button>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-6 group">
               <div className="aspect-video w-full bg-slate-100">
                 <img src={image} alt="Preview" className="w-full h-full object-cover" />
               </div>
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => setImage(null)}
                    className="bg-white text-red-500 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-red-50"
                  >
                    <X size={16} /> Remove
                  </button>
               </div>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Detailed Observation *</label>
            <textarea
              required
              name="observation"
              value={formData.observation}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the test you performed and the result you observed..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button 
            type="submit" 
            fullWidth 
            disabled={isSubmitting}
            className="shadow-xl shadow-primary-500/20 py-4 text-lg"
          >
            {isSubmitting ? 'Uploading to Database...' : 'Submit Complaint'}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-800 text-xs leading-relaxed">
           <AlertTriangle size={16} className="shrink-0 mt-0.5" />
           <p>
             <strong>Disclaimer:</strong> This app is for educational purposes. Reports here are not legal complaints. Contact FSSAI for official action.
           </p>
        </div>
      </form>
    </div>
  );
};