import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '210607278507-gtspl2pcqu26u18i9762498o5ipvpi77.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyD-OG4KnJqKz5bf2gHeNYsb08moMkd_2p0';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar';


  constructor() {
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  private async initClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      discoveryDocs: this.DISCOVERY_DOCS,
      scope: this.SCOPES,
    });

    // Manejar redirección
    this.handleRedirect();
  }

  async signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    try {
      await authInstance.signIn({
        ux_mode: 'redirect',
        redirect_uri: 'http://localhost:8100/tabs/tab3',
      });
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
    }
  }

  private handleRedirect() {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance.isSignedIn.get()) {
      // Usuario ya autenticado, no se requiere manejar token en URL
      console.log('Usuario ya autenticado.');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      gapi.auth2.getAuthInstance().grantOfflineAccess().then(() => {
        console.log('Token de acceso gestionado tras redirección.');
      }).catch(error => {
        console.error('Error al gestionar token tras redirección:', error);
      });
    } else {
      console.warn('No se encontró token de acceso en la URL.');
    }
  }

  async getEvents() {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 10,
      });

      // Verificar si la respuesta contiene eventos
      if (response.result.items && response.result.items.length > 0) {
        return response.result.items;
      } else {
        console.warn('No se encontraron eventos en el calendario.');
        return []; // Devuelve un arreglo vacío si no hay eventos
      }
    } catch (error: unknown) {
      // Verificar si el error es un objeto de tipo Error
      if (error instanceof Error) {
        console.error('Error al obtener eventos:', error.message);
        if (error.stack) {
          console.error('Stack trace:', error.stack);
        }
      } else {
        console.error('Error desconocido:', error);
      }
      return []; // Devuelve un arreglo vacío en caso de error
    }
  }

}
