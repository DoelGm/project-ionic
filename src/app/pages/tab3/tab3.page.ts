import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleCalendarService } from 'src/app/services/google-calendar.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: any = null;
  events: any[] = [];

  constructor(
    private authService: AuthService,
    private calendarService: GoogleCalendarService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  async login() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async logout() {
    await this.authService.logout();
    this.user = null;
    this.events = [];
  }

  async loadEvents() {
    try {
      await this.calendarService.signIn();
 
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  }
}
