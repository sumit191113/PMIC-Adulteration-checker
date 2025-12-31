import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ------------------------------------------------------------------
// CONFIGURATION
// These keys connect the app to your specific Firebase project.
// ------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyAKOyQ-bm0RN6dllgWRsa3Zi8veUvqu548",
  authDomain: "milkrecord-bc81a.firebaseapp.com",
  databaseURL: "https://milkrecord-bc81a-default-rtdb.firebaseio.com",
  projectId: "milkrecord-bc81a",
  storageBucket: "milkrecord-bc81a.firebasestorage.app",
  messagingSenderId: "833623159257",
  appId: "1:833623159257:web:94c90cb5f0fef6d4d269c8"
};

let db: any = null;
let app: any = null;
let isConfigured = false;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);
  isConfigured = true;
  console.log("Firebase initialized successfully");
} catch (e) {
  console.error("Firebase initialization failed:", e);
  console.log("Falling back to Local Storage mode.");
}

export { db, isConfigured };