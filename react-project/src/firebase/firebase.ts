import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
