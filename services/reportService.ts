import { db, isConfigured } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Report } from '../types';

const COLLECTION_NAME = 'reports';
const LOCAL_STORAGE_KEY = 'pmic_reports';

/**
 * Saves a report to either Firebase (if configured) or LocalStorage.
 */
export const saveReport = async (report: Report): Promise<void> => {
  if (isConfigured && db) {
    try {
      // Create a copy without the ID (Firestore generates ID)
      const { id, ...reportData } = report;

      // Firestore does not support 'undefined' values.
      const cleanData: Record<string, any> = { ...reportData };
      Object.keys(cleanData).forEach(key => {
        if (cleanData[key] === undefined) {
          cleanData[key] = null;
        }
      });

      await addDoc(collection(db, COLLECTION_NAME), cleanData);
    } catch (error: any) {
      console.error("Error writing to Firestore", error);
      
      // Check for common setup errors
      if (error.code === 'not-found' || (error.message && error.message.includes('database'))) {
        const msg = "Database Setup Error: The Firestore database has not been created yet.\n\nPlease go to Firebase Console > Firestore Database and click 'Create Database'.";
        alert(msg);
      }
      
      throw new Error("Could not save to cloud database.");
    }
  } else {
    // Fallback: Local Storage
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const reports = existing ? JSON.parse(existing) : [];
    reports.unshift(report);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  }
};

/**
 * Fetches reports from either Firebase (if configured) or LocalStorage.
 */
export const getReports = async (): Promise<Report[]> => {
  if (isConfigured && db) {
     try {
       const q = query(collection(db, COLLECTION_NAME), orderBy('dateOfSubmission', 'desc'), limit(50));
       const snapshot = await getDocs(q);
       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Report));
     } catch (error: any) {
       console.error("Error reading from Firestore", error);
       
       // Re-throw critical setup errors so UI can display them
       if (error.code === 'not-found' || (error.message && error.message.includes('database'))) {
          throw new Error("DB_NOT_CREATED");
       }

       // For connectivity issues, try to fall back to local storage so user sees *something*
       const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
       return existing ? JSON.parse(existing) : [];
     }
  } else {
     // Fallback: Local Storage
     const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
     return existing ? JSON.parse(existing) : [];
  }
}

/**
 * Helper to compress image string to avoid DB size limits.
 * Firestore document max size is 1MB. We aim for < 500KB.
 */
export const compressImage = (base64Str: string, maxWidth = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if(ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            } else {
                resolve(base64Str);
            }
        };
        img.onerror = () => resolve(base64Str);
    });
};