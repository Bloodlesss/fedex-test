import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Password } from 'primeng/password';
import { Observable, pipe, first, map, catchError, of } from 'rxjs';
import { ApiRequestsService } from 'src/app/modules/auth/services/api-requests.service';
import { FieldsRegex } from '../enums/fields-regex';
import { EmailVerification } from '../models/email-verification';

@Injectable({
  providedIn: 'root',
})
export class FieldValidatorService {
  private readonly regex: FieldsRegex = new FieldsRegex();
  constructor(private apiRequest: ApiRequestsService) {}

  public ValidatePassword(
    firstNameControl: AbstractControl,
    lastNameControl: AbstractControl,
    passwordControl: AbstractControl
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const containNameError: ValidationErrors = { constainName: true };
      const validationError: ValidationErrors = { password: true };
      const firstName: string = firstNameControl.value;
      const lastName: string = lastNameControl.value;
      const password: string = control.value;
      if (password) {
        if (!this.regex.password.test(password)) {
          return validationError;
        }
        if (
          (password.toLowerCase().includes(firstName.toLowerCase()) &&
            firstName.trim() !== '') ||
          (password.toLowerCase().includes(lastName.toLowerCase()) &&
            lastName.trim() !== '')
        ) {
          return containNameError;
        }
        return null;
      }
      return null;
    };
  }
  public verifyEmailAsync(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const emailDoesNotExisit: ValidationErrors = { mailNotExist: true };
    return this.apiRequest.verifyEmail(control.value).pipe(
      first(),
      map((response: EmailVerification): ValidationErrors | null => {
        if (!response.mx_found || !response.smtp_check) {
          return emailDoesNotExisit;
        }

        return null;
      }),
      catchError(
        (): Observable<ValidationErrors> => of(emailDoesNotExisit)
      )
    );
  }
}
