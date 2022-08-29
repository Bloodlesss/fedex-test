import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/shared/enums/constants';
import { FieldsRegex } from 'src/app/shared/enums/fields-regex';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { FieldValidatorService } from 'src/app/shared/services/field-validator.service';
import { ApiRequestsService } from '../../services/api-requests.service';

@Component({
  selector: 'fed-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  public constants = Constants;
  private readonly regex: FieldsRegex = new FieldsRegex();
  signUpFormGroup!: FormGroup;
  @Output() signedUpUserFunction: EventEmitter<SignedUpUser> =
    new EventEmitter<SignedUpUser>();
  constructor(
    private readonly formBuilder: FormBuilder,
    private validatorService: FieldValidatorService,
    private apiService: ApiRequestsService,
  ) {}

  ngOnInit(): void {
    this.signUpFormGroup = this.intializeFormGroup();
    let firstNameControl: FormControl = <FormControl>(
      this.signUpFormGroup.get(Constants.FirstName)
    );
    let lastNameControl: FormControl = <FormControl>(
      this.signUpFormGroup.get(Constants.LastName)
    );
    let passwordControl: FormControl = <FormControl>(
      this.signUpFormGroup.get(Constants.Password)
    );
    passwordControl.setValidators([
      Validators.required,
      this.validatorService.ValidatePassword(
        firstNameControl,
        lastNameControl,
        passwordControl
      ),
    ]);
    merge(
      firstNameControl.valueChanges as Observable<string>,
      lastNameControl.valueChanges as Observable<string>
    ).subscribe((): void => {
      passwordControl.updateValueAndValidity();
    });
  }
  public onSubmit(): void {
    // Process checkout data here
    this.apiService
      .userSignUp(this.signUpFormGroup.value)
      .subscribe((userInfo: SignedUpUser) => {
        this.signedUpUserFunction.emit(userInfo);
      });
  }
  intializeFormGroup(): FormGroup {
    return this.formBuilder.group({
      [Constants.FirstName]: [
        '',
        [Validators.required, Validators.pattern(this.regex.Names)],
      ],
      [Constants.LastName]: [
        '',
        [Validators.required, Validators.pattern(this.regex.Names)],
      ],
      [Constants.Email]: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(this.regex.email),
          ],
          asyncValidators: this.validatorService.verifyEmailAsync.bind(
            this.validatorService
          ),
        },
      ],
      [Constants.Password]: [''],
    });
  }
}
