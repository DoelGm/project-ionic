import { Component, OnInit } from '@angular/core';
import { GoogleCalendarService } from 'src/app/services/google-calendar.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private googleCalendar: GoogleCalendarService,private router: Router) { }

  ngOnInit() {}

  signIn() {

    this.googleCalendar.signInWithPopup().then(() => {

      this.router.navigate(['../tabs']);
    }).catch(error => {
      console.error('Error during Google Sign-In', error);

    });
  }
}
