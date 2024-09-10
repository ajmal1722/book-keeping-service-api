// firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config(); 
import serviceAccount from '../../serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();
export default bucket;