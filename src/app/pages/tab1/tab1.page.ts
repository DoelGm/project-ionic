import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../services/push-notification.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private webPushService: PushNotificationService,) {}


  ngOnInit(){
    this.webPushService.sendLocalNotification('¡Hola!', {
      body: 'Esta es una notificación local.',
      icon: 'assets/icon.png', // Icono opcional
    });

  }

}
