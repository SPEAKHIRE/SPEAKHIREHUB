import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { registerChampionComponent } from './components/register/champion/registerChampion.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { registerPartnerComponent } from './components/register/partnerInterest/registerPartner.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTooltipModule } from '@angular/material/tooltip'


@NgModule({
  declarations: [
    LoginComponent,
    registerChampionComponent,
    ResetPasswordComponent,
    registerPartnerComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AuthRoutingModule,

    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  exports: [
    LoginComponent,
    registerChampionComponent,
    ResetPasswordComponent,
    registerPartnerComponent
  ]
})
export class AuthModule { }
