import React, { useEffect, useState } from 'react';
import { Report } from '../types';
import { User, Calendar, Tag, Search, X, CloudOff, Globe, AlertTriangle } from 'lucide-react';
import { getReports } from '../services/reportService';
import { isConfigured } from '../services/firebaseConfig';

export const ReportListScreen: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReports();
        setReports(data);
      } catch (e: any) {
        console.error("Failed to load reports", e);
        if (e.message === "DB_NOT_CREATED") {
           setError("Database Setup Required: Please go to Firebase Console -> Firestore Database and click 'Create Database'.");
        } else {
           setError("Unable to connect to database. Showing locally saved reports if available.");
           // Even if failed, try to load local empty state
           setReports([]); 
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadReports();
  }, []);

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Unknown Date';
    }
  };

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto animate-slide-up pb-20">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Community Reports</h2>
          <p className="text-slate-500 text-sm">See what others have found.</p>
        </div>
        <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border ${isConfigured ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
            {isConfigured ? (
                <> <Globe size={10} /> Online DB </>
            ) : (
                <> <CloudOff size={10} /> Local Mode </>
            )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-red-800 text-sm mb-1">Connection Error</h3>
            <p className="text-red-700 text-xs leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No Reports Yet</h3>
          <p className="text-slate-400 max-w-xs mx-auto mt-2">
            {error ? "Please fix the database connection to see reports." : "Be the first to submit a report about adulterated food items."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
              
              {/* Card Header */}
              <div className="p-5 border-b border-slate-50 flex justify-between items-start bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-primary-600 shadow-sm">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block text-sm">{report.reporterName}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar size={10} /> {formatDate(report.dateOfSubmission)}
                      </span>
                    </div>
                  </div>
                  {report.brandName && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-1 rounded-md">
                      {report.brandName}
                    </span>
                  )}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                   <div className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-red-100">
                      <Tag size={12} /> {report.foodName}
                   </div>
                   <div className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-100">
                      ⚠ {report.adulterantName}
                   </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                   <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{report.observation}"
                   </p>
                </div>

                {report.imageBase64 && (
                  <div className="mt-2">
                    <button 
                      onClick={() => setSelectedImage(report.imageBase64!)}
                      className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200 group/image cursor-zoom-in"
                    >
                      <img 
                        src={report.imageBase64} 
                        alt="Product evidence" 
                        className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="text-white text-xs font-medium px-3 py-1 bg-black/40 backdrop-blur-md rounded-full">Tap to enlarge</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size evidence" 
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};