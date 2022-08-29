import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { merge, Observable, Subscription } from 'rxjs';
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
  public pending: boolean = false;
  private readonly regex: FieldsRegex = new FieldsRegex();
  signUpFormGroup!: FormGroup;
  private readonly subscription: Subscription = new Subscription();
  @Output() signedUpUserFunction: EventEmitter<SignedUpUser> =
    new EventEmitter<SignedUpUser>();
  constructor(
    private readonly formBuilder: FormBuilder,
    public validatorService: FieldValidatorService,
    private apiService: ApiRequestsService,
    private changeDetectorRef: ChangeDetectorRef
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

    this.validatorService.loading.subscribe((state: boolean) => {
      this.pending = state;
      this.changeDetectorRef.markForCheck();
    });
  }

  public onSubmit(): void {
    // Process checkout data here
    this.pending = true;
    this.apiService
      .userSignUp(this.signUpFormGroup.value)
      .subscribe((userInfo: SignedUpUser) => {
        this.signedUpUserFunction.emit(userInfo);
        this.pending = false;
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
