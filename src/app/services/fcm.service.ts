import { Injectable } from '@angular/core';
import {PushNotifications, Token, ActionPerformed, PushNotificationSchema} from '@capacitor/push-notifications';
import{Capacitor} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor() { }

 public initPush(){
    if(Capacitor.platform == 'web' && Capacitor.platform != 'web' ){
      this.registerPush();
    }
  }
  private registerPush(){
    PushNotifications.requestPermissions().then((permission:any) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();

    }
  });
   // Obtener el token de registro
   PushNotifications.addListener('registration', (token: Token) => {
    console.log('Mi token:', token.value);
  });

  // Manejar errores de registro
  PushNotifications.addListener('registrationError', (error: any) => {
    console.log('Error al registrar:', JSON.stringify(error));
  });

  // Escuchar cuando se recibe una notificación push
  PushNotifications.addListener(
    'pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log('Notificación recibida:', JSON.stringify(notification));
   }
  );
 }
}




