import { initializeApp } from "firebase/app";
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyD-OG4KnJqKz5bf2gHeNYsb08moMkd_2p0",
    authDomain: "notificaciones-push-20dcd.firebaseapp.com",
    projectId: "notificaciones-push-20dcd",
    storageBucket: "notificaciones-push-20dcd.appspot.com",  // Corregido aquí
    messagingSenderId: "210607278507",
    appId: "1:210607278507:web:cca0fb27a7854f300aeaee",
    vapidKey: "BMqFiG1mnFDSVtv4CRZmY0DEsHntZKAt_g-SnEJVJmHl4uwt51BajrJhUA_m3i8VkLKpTtqFyGhU04QiiKjvH1s"
  }
};
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
