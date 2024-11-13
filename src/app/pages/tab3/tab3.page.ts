import { Component, OnInit } from '@angular/core';
import { GoogleCalendarService } from 'src/app/services/google-calendar.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public events: any[] = [];

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit() {
    // Inicializar el cliente de Google
    this.googleCalendarService.initGoogleAuth();
  }

  // Obtener los eventos del calendario
  async getEvents() {
    try {
      // Verificamos si el usuario tiene un token de acceso
      if (!this.googleCalendarService.accessToken) {
        console.log('No access token available. Initiating sign-in.');
        await this.googleCalendarService.signInWithPopup();
      }
      // Ahora obtenemos los eventos si tenemos un token válido
      const response = await this.googleCalendarService.getCalendarEvents();
      this.events = response.items;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  }

  // Cerrar sesión
  signOut() {
    this.googleCalendarService.signOut();
    this.events = [];
  }
}
