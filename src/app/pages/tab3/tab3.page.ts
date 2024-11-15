import { Component } from '@angular/core';
// Asegúrate de que la ruta sea correcta
import { GoogleCalendarService } from '../../services/google-calendar.service'; // Ajusta la ruta según la estructura

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  events: any[] = [];

  constructor(private authService: GoogleCalendarService) { }

  // Iniciar sesión en Google
  signIn() {
    this.authService.signIn().then(() => {
      console.log('Signed in successfully');
    }).catch((err) => {
      console.error('Error signing in', err);
    });
  }

  // Obtener eventos del calendario
  async getEvents() {
  try {
    const response = await this.authService.getCalendarEvents();
    console.log('API Response:', response); // Agrega esta línea
    this.events = response.result.items; // Asegúrate de que 'result' existe
    console.log('Events:', this.events);
  } catch (err) {
    console.error('Error fetching events', err);
  }
}

  // Cerrar sesión
  signOut() {
    this.authService.signOut();
    console.log('Signed out');
  }
}
