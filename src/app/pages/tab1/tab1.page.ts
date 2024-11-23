import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { SwPush } from '@angular/service-worker';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
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
    private webPushService: PushNotificationService,
    private swPush: SwPush) {}


  ngOnInit(){
    this.webPushService.sendLocalNotification('¡Hola!', {
      body: 'Esta es una notificación local.',
      icon: 'assets/icon.png', // Icono opcional
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
