import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'weddingapp-ed53f.firebaseapp.com',
  projectId: 'weddingapp-ed53f',
  storageBucket: 'weddingapp-ed53f.appspot.com',
  messagingSenderId: '1024458765127',
  appId: '1:1024458765127:web:497dfd1070e7d0cda01262',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
