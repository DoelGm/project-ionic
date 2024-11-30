import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('Usuario autenticado con éxito:', user);
        this.router.navigate(['/tabs']);
      }
    });
  }

  async loginWithGoogle() {
    try {
      const result = await this.authService.loginWithGoogle();
      console.log('Inicio de sesión exitoso:', result);
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }
}
