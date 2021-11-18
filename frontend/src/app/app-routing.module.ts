import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { registerChampionComponent } from './auth/components/register/champion/registerChampion.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { registerPartnerComponent } from './auth/components/register/partnerInterest/registerPartner.component';


const routes: Routes = [
  { path: '', redirectTo: 'registerChampion', pathMatch: 'full' },
  {path: 'login' , component: LoginComponent},
  {path: 'registerChampion' , component: registerChampionComponent},
  {path: 'reset-password' , component: ResetPasswordComponent},
  {path: 'partnerInterest' , component: registerPartnerComponent},

    {
      path: '',
      component: registerChampionComponent
    },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
