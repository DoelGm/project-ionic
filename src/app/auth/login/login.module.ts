import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';  // Ruta del enrutamiento de login
import { LoginPage } from './login.page';  // Componente de la página de login

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule  // Importa el módulo de ruteo
  ],
  declarations: [LoginPage]  // Declara el componente LoginPage
})
export class LoginPageModule {}  // Asegúrate de que exporta LoginPageModule
