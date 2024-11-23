import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { AppModule } from './app/app.module';

// Inicializa la aplicación Angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Registrar el service worker para Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch((err) => {
      console.error('Error al registrar el Service Worker:', err);
    });
}
