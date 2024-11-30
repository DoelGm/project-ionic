import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm.service';
import { PushNotificationService } from './services/push-notification.service';
import { GoogleCalendarService } from './services/google-calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  events: any[] = [];

  constructor(
    private readonly platform: Platform,
    private readonly fcmService: FcmService,
    private readonly webPushService: PushNotificationService,
    private readonly googleCalendarService: GoogleCalendarService
  ) {
    this.initializeApp();
    this.webPushService.requestWebNotificationPermission();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcmService.initPush();
    });
  }

  async ngOnInit() {
    // Maneja el redireccionamiento
    const accessToken = this.googleCalendarService.handleRedirect();

    if (accessToken) {
      // Si hay un token, obtiene los eventos
      try {
        const eventsResponse = await this.googleCalendarService.getEvents(accessToken);
        this.events = eventsResponse.items || [];
        console.log('Eventos cargados:', this.events);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    } else {
      // Si no hay token, inicia el flujo de autenticación
      this.googleCalendarService.signIn();
    }
  }
}
