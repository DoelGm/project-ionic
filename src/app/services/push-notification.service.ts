import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor() {}

  async requestWebNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Permiso concedido para notificaciones web.');
      } else {
        console.log('Permiso denegado para notificaciones web.');
      }
    } else {
      console.log('El navegador no soporta notificaciones.');
    }
  }

  // Enviar una notificación local
  async sendLocalNotification(title: string, options?: NotificationOptions) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, options);

      // Opcional: Manejar clics en la notificación
      notification.onclick = () => {
        console.log('Notificación clickeada.');
      };

      return notification;
    } else {
      return console.log('No se pueden enviar notificaciones. Permiso denegado o navegador incompatible.');

    }
  }
}

