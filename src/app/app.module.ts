// Importar desde Firebase y AngularFire
import { AngularFireModule } from '@angular/fire/compat';  // Usar 'compat' para compatibilidad
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Usar 'AngularFireModule'
    AngularFireMessagingModule,  // Si necesitas mensajería push
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('firebase-messaging-sw.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
