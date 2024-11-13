import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  public accessToken: string | null = null;

  constructor() { }

  // Inicializar Google Auth con ventana emergente
  initGoogleAuth(): void {
    google.accounts.oauth2.initTokenClient({
      client_id: '76129765560-noa1dns67tkj60qb8dun29h61kq7rjq8.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  }

  // Manejar la respuesta del token
  handleCredentialResponse(response: any) {
    console.log('Credential Response', response);
    this.accessToken = response.access_token;
  }

  // Abrir la ventana emergente de Google para iniciar sesión
  signInWithPopup(): Promise<void> {
    return new Promise((resolve, reject) => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: '76129765560-noa1dns67tkj60qb8dun29h61kq7rjq8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        callback: (response: any) => {
          this.handleCredentialResponse(response);
          resolve();
        }
      });

      client.requestAccessToken();
    });
  }

  // Cerrar sesión
  signOut(): void {
    this.accessToken = null;
    console.log('User signed out');
  }

  // Obtener eventos del calendario
  async getCalendarEvents(): Promise<any> {
    if (!this.accessToken) {
      throw new Error('No access token available. User might not be signed in.');
    }

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=${this.accessToken}`);
    const data = await response.json();
    return data;
  }
}
