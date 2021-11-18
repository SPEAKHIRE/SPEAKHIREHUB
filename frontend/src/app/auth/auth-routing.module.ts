import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { registerChampionComponent } from './components/register/champion/registerChampion.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { registerPartnerComponent } from './components/register/partnerInterest/registerPartner.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'register/champion' , component: registerChampionComponent},
  {path: 'reset-password' , component: ResetPasswordComponent},
  {path: 'register/partnerInterest' , component: registerPartnerComponent},
    {
      path: '',
      component: registerChampionComponent
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes),RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
