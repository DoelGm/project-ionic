import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private CLIENT_ID = '210607278507-gtspl2pcqu26u18i9762498o5ipvpi77.apps.googleusercontent.com';
  private SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
  private REDIRECT_URI = 'http://localhost:8100';

  constructor() {}

  // Redirige al usuario para autenticarse
  signIn() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(
      this.SCOPES
    )}&include_granted_scopes=true`;
    window.location.href = authUrl; // Redirige al usuario
  }

  // Procesa el token después del redireccionamiento
  handleRedirect(): string | null {
    const fragment = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = fragment.get('access_token');
    return accessToken;
  }

  // Obtiene eventos del calendario
  async getEvents(accessToken: string) {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' +
        new Date().toISOString() +
        '&singleEvents=true&orderBy=startTime',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener eventos');
    }
    return await response.json();
  }

}
