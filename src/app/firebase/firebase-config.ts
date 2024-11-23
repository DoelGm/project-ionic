// src/app/firebase/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-OG4KnJqKz5bf2gHeNYsb08moMkd_2p0",
  authDomain: "notificaciones-push-20dcd.firebaseapp.com",
  projectId: "notificaciones-push-20dcd",
  storageBucket: "notificaciones-push-20dcd.appspot.com",
  messagingSenderId: "210607278507",
  appId: "1:210607278507:web:cca0fb27a7854f300aeaee"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de Firebase Messaging
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
