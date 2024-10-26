import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private gapiSetup: boolean = false;
  private authInstance: gapi.auth2.GoogleAuth | undefined;
  public user: gapi.auth2.GoogleUser | null = null; // Usar un tipo más específico

  constructor() { }

  // Cargar la API de Google
  async initGoogleAuth(): Promise<void> {
    if (!this.gapiSetup) {
      await new Promise<void>((resolve, reject) => {
        gapi.load('client:auth2', () => {
          resolve();
        });
      });

      await gapi.client.init({
        apiKey: 'AIzaSyCiefhKhwxjP59HK6Qd4sQOqWLNADitEe4',
        clientId: '76129765560-noa1dns67tkj60qb8dun29h61kq7rjq8.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      this.authInstance = gapi.auth2.getAuthInstance();
      this.gapiSetup = true;
    }
  }

  // Iniciar sesión con Google
  async signIn(): Promise<void> {
    await this.initGoogleAuth();
    try {
      this.user = await this.authInstance!.signIn(); // Usa el operador de aserción no nulo
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  }

  // Cerrar sesión
  signOut(): void {
    if (this.authInstance) {
      this.authInstance.signOut();
      this.user = null;
    }
  }

  // Obtener eventos del calendario
  async getCalendarEvents(): Promise<any> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
  
    const response = await gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });
  
    // Verificar si la respuesta tiene 'result'
    if (!response || !response.result) {
      throw new Error('Invalid response from Google Calendar API');
    }
  
    return response;
  }
}
