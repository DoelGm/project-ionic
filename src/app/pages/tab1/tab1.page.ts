import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { SwPush } from '@angular/service-worker';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { environment } from '../../../environments/environment';
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
    private swPush: SwPush) {}
  ngOnInit(){
    this.requestPermission();  // Solicitar permisos para recibir notificaciones
    this.receiveMessage();
    this.localNotifications.schedule({
      id: 1,
      title: 'Tus notificaciones te esparan',
      text: 'Este es un recordatorio diario',
      trigger: { every: { hour: 11, minute: 50 } }, // A las 9:00 AM
      foreground: true,
    });
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
          // Aquí puedes procesar el mensaje recibido, como mostrarlo en una notificación
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
