import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Constants } from 'src/app/shared/enums/constants';
import { FieldValidatorService } from 'src/app/shared/services/field-validator.service';
import { Spied } from 'src/specs/utils.type';
import { ApiRequestsService } from '../../services/api-requests.service';
import { of } from 'rxjs';
import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let mockedFormBuilder: Spied<FormBuilder>;
  let mockedValidatorService: Spied<FieldValidatorService>;
  let mockedApiService: Spied<ApiRequestsService>;
  const mockedFirstNameControl: FormControl = new FormControl('');
  const mockedLastNameControl: FormControl = new FormControl('');
  const mockedPasswordControl: FormControl = new FormControl('');
  const mockedEmailControl: FormControl = new FormControl('');
  let mockedFormGroup: FormGroup = new FormGroup({
    [Constants.FirstName]: mockedFirstNameControl,
    [Constants.LastName]: mockedLastNameControl,
    [Constants.Password]: mockedPasswordControl,
    [Constants.Email]: mockedEmailControl,
  });
  beforeEach(async () => {
    mockedFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    spyOn(mockedFormGroup, 'get').and.returnValues(
      mockedFirstNameControl,
      mockedLastNameControl,
      mockedPasswordControl,
      mockedEmailControl
    );
    spyOn(mockedPasswordControl, 'setValidators');
    spyOn(mockedPasswordControl, 'updateValueAndValidity');
    mockedFormBuilder.group.and.returnValue(mockedFormGroup);
    mockedValidatorService = jasmine.createSpyObj('FieldValidatorService', [
      'ValidatePassword',
      'verifyEmailAsync',
    ]);
    mockedApiService = jasmine.createSpyObj('ApiRequestsService', [
      'userSignUp',
    ]);
    mockedApiService.userSignUp.and.returnValue(
      of({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
      })
    );
    await TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: mockedFormBuilder,
        },
        {
          provide: FieldValidatorService,
          useValue: mockedValidatorService,
        },
        {
          provide: ApiRequestsService,
          useValue: mockedApiService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should intialize FormGroup', () => {
      expect(component.signUpFormGroup).toEqual(mockedFormGroup);
    });

    it('should update passwordControl validators', (): void => {
      expect(mockedPasswordControl.setValidators).toHaveBeenCalledOnceWith([
        Validators.required,
        mockedValidatorService.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        ),
      ]);
    });
    it('should call passwordControl.updateValueAndValidity', (): void => {
      mockedFirstNameControl.patchValue('test');
      expect(mockedPasswordControl.updateValueAndValidity).toHaveBeenCalled();
    });
  });
  describe('onSubmit', () => {
    it('should submit form', () => {
      component.onSubmit();
      expect(mockedApiService.userSignUp).toHaveBeenCalled();
    });
  });
});
