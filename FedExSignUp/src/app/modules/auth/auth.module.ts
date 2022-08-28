import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { Password, PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthRoutingModule } from './auth-routing.module';
import { FieldErrorsLabelComponent } from './components/field-errors-label/field-errors-label.component';
import { HttpClient } from '@angular/common/http';
import { UserReceptionComponent } from './components/user-reception/user-reception.component';
@NgModule({
  declarations: [
    SignUpComponent,
    SignUpFormComponent,
    FieldErrorsLabelComponent,
    UserReceptionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    PasswordModule,
    RippleModule,
    AuthRoutingModule,
  ],
  providers: [Password, HttpClient],
})
export class AuthModule {}
