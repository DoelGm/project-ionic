import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor() {}

  initPushNotifications() {
    // Verificar si estamos en una plataforma móvil (Android/iOS)
    if (Capacitor.getPlatform() == 'web') {
      // Inicializar notificaciones push solo si estamos en una plataforma móvil
      PushNotifications.requestPermissions().then((permission) => {
        if (permission.receive === 'granted') {
          PushNotifications.register();
        } else {
          console.log('Permiso denegado para notificaciones push.');
        }
      });

      // Escuchar las notificaciones
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Notificación recibida', notification);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        console.log('Acción de notificación realizada', action);
      });
    } else {
      console.log('El plugin de PushNotifications no está disponible en la web.');
    }
  }
}
