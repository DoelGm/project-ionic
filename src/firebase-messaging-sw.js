// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');


firebase.initializeApp({
  apiKey: "AIzaSyD-OG4KnJqKz5bf2gHeNYsb08moMkd_2p0",
  authDomain: "notificaciones-push-20dcd.firebaseapp.com",
  projectId: "notificaciones-push-20dcd",
  storageBucket: "notificaciones-push-20dcd.appspot.com",
  messagingSenderId: "210607278507",
  appId: "1:210607278507:web:cca0fb27a7854f300aeaee",
  vapidKey: "BMqFiG1mnFDSVtv4CRZmY0DEsHntZKAt_g-SnEJVJmHl4uwt51BajrJhUA_m3i8VkLKpTtqFyGhU04QiiKjvH1s"
});


// Recuperar una instancia de Firebase Messaging para manejar mensajes en segundo plano
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icon/favicon.png' // Icono de notificación
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
