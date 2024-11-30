import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private CLIENT_ID = '210607278507-gtspl2pcqu26u18i9762498o5ipvpi77.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyD-OG4KnJqKz5bf2gHeNYsb08moMkd_2p0';
  private DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ];
  private SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

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
    gapi.auth2.getAuthInstance().signIn({ prompt: 'select_account' });
  }


  async signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    await authInstance.signIn();
  }

  async getEvents() {
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 10
    });
    return response.result.items;
  }

}
