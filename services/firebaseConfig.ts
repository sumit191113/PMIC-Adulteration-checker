// OFFLINE MODE
// This application is configured to run fully offline.
// Firebase initialization is disabled.

const db: any = null;
const isConfigured = false;

console.log("App running in Offline Mode. Firebase disabled.");

export { db, isConfigured };