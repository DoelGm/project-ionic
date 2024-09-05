import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';  // Importa el componente de login

const routes: Routes = [
  {
    path: '',
    component: LoginPage  // Ruta que apunta al componente de login
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
