import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { SwPush } from '@angular/service-worker';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { environment } from '../../../environments/environment';
import { PushNotificationService } from '../../services/push-notification.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  culo = 'hola';
  constructor(
    private localNotifications: LocalNotifications,
    private afMessaging: AngularFireMessaging,
    private pushNotificationService: PushNotificationService,
    private swPush: SwPush) {}

  ngOnInit(){
    this.requestPermission();  // Solicitar permisos para recibir notificaciones
    this.receiveMessage();
    this.pushNotificationService.initPushNotifications();
  }
  requestPermission() {
    this.afMessaging.requestPermission
      .pipe()
      .subscribe({
        next: () => {
          console.log('Permiso concedido');
        },
        error: (err) => {
          console.error('Permiso denegado', err);
        },
      });
  }

  // Manejar la recepción de mensajes push
  receiveMessage() {
    this.afMessaging.messages
      .pipe()
      .subscribe({
        next: (message) => {
          console.log('Mensaje recibido:', message);
          const title = message.notification ? message.notification.title : 'Título predeterminado';
          const body = message.notification ? message.notification.body : 'Cuerpo del mensaje predeterminado';
          this.localNotifications.schedule({
            id: 2,  // ID de la notificación (debe ser único)
            title: title,  // El título del mensaje push
            text: body,  // El cuerpo del mensaje push
            data: message,  // Puedes agregar datos adicionales al mensaje, si lo deseas
          });
        },
        error: (err) => {
          console.error('Error al recibir el mensaje:', err);
        },
      });
  }

  // Función para manejar la suscripción a las notificaciones
  // subscribeToNotifications() {
  //   if (this.swPush.isEnabled) {
  //     this.swPush.requestSubscription({
  //       serverPublicKey: environment.pushNotificationPublicKey // Usar una clave pública del servidor para suscripción
  //     })
  //     .then(subscription => {
  //       console.log('Suscripción recibida:', subscription);
  //       // Aquí puedes enviar la suscripción al servidor para guardar
  //     })
  //     .catch(err => console.error('Error al suscribirse a las notificaciones', err));
  //   }
  // }

}
