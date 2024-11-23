import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm.service';
import { PushNotificationService } from './services/push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly platform: Platform,
    private readonly fcmService: FcmService,
    private webPushService: PushNotificationService
  ) {
    this.initializeApp();
    this.webPushService.requestWebNotificationPermission();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcmService.initPush();

    });

  }
}
