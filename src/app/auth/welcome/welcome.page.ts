import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  component = LoginPage;

}
