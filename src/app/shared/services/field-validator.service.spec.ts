import { TestBed } from '@angular/core/testing';
import { ApiRequestsService } from 'src/app/modules/auth/services/api-requests.service';
import { Spied } from 'src/specs/utils.type';
import { Observable, of } from 'rxjs';
import { FieldValidatorService } from './field-validator.service';
import { FieldsRegex } from '../enums/fields-regex';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SignUpState } from '../enums/sign-up-state';
import { EmailVerification } from '../models/email-verification';
import { MockDataVerification } from 'src/specs/mock-data';

fdescribe('FieldValidatorService', () => {
  let service: FieldValidatorService;
  let mockedApiService: Spied<ApiRequestsService>;
  const mockedregex: FieldsRegex = new FieldsRegex();
  const mockedContainNameError: ValidationErrors = { constainName: true };
  const mockedValidationError: ValidationErrors = { password: true };
  const mockedEmailDoesNotExisit: ValidationErrors = { mailNotExist: true };
  const mockedFirstName: string = '';
  const mockedLastName: string = '';
  const mockedPassword: string = '';

  let verifyEmailObservable: Observable<EmailVerification> =
    new Observable<EmailVerification>();
  let mockedFirstNameControl: FormControl = new FormControl('');
  let mockedLastNameControl: FormControl = new FormControl('');
  let mockedPasswordControl: FormControl = new FormControl('');
  let mockedEmailControl: FormControl = new FormControl('');
  const intializeTestParams: ( verifyEmailObservable?: Observable<Partial<EmailVerification>>) => void = (
    verifyEmailObservable: Observable<Partial<EmailVerification>> = of({}),
  ): void => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiRequestsService,
          useValue: mockedApiService,
        },
      ],
    });
    service = TestBed.inject(FieldValidatorService);
    mockedApiService = jasmine.createSpyObj('ApiRequestsService', [
      'verifyEmail',
    ]);
    mockedApiService.verifyEmail.and.returnValue(
      <Observable<EmailVerification>>verifyEmailObservable
    );
   };

  describe('ValidatePassword', (): void => {
    beforeEach(() => {
      intializeTestParams();
    });
    it('should check password if password is falsy should return null', () => {
      mockedFirstNameControl = new FormControl('');
      mockedLastNameControl = new FormControl('');
      mockedPasswordControl = new FormControl('');
      const result: null = <null>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toBeNull();
    });
    it('should check password if password contains to first Name should return containName Error as true ', () => {
      mockedFirstNameControl = new FormControl('jamal');
      mockedLastNameControl = new FormControl('');
      mockedPasswordControl = new FormControl('jamal123');
      const result: ValidationErrors = <ValidationErrors>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toEqual(mockedContainNameError);
    });
    it('should check password if password contains to last Name should return containName Error as true ', () => {
      mockedFirstNameControl = new FormControl('');
      mockedLastNameControl = new FormControl('saleh');
      mockedPasswordControl = new FormControl('saleh123');
      const result: ValidationErrors = <ValidationErrors>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toEqual(mockedContainNameError);
    });
    /*
    chosen standards:
          -Should be a minimum of EIGHT characters
          -Should contain at least one UPPERCASE letter
          -Should contain at least one LOWERCASE letter
    */
    it('should check password if password is not up to the chosen standards:Should be a minimum of EIGHT characters  returns Error {password:true}', () => {

      mockedFirstNameControl = new FormControl('jamal');
      mockedLastNameControl = new FormControl('saleh');
      mockedPasswordControl = new FormControl('Passwor');
      const result: ValidationErrors = <ValidationErrors>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toEqual(mockedValidationError);
    });
    it('should check password if password is not up to the chosen standards:Should contain at least one UPPERCASE letter returns Error {password:true} ', () => {
      mockedFirstNameControl = new FormControl('jamal');
      mockedLastNameControl = new FormControl('saleh');
      mockedPasswordControl = new FormControl('password');
      const result: ValidationErrors = <ValidationErrors>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toEqual(mockedValidationError);
    });
    it('should check password if password is not up to the chosen standards:Should contain at least one LOWERCASE letter returns Error {password:true}', () => {
      mockedFirstNameControl = new FormControl('jamal');
      mockedLastNameControl = new FormControl('saleh');
      mockedPasswordControl = new FormControl('PASSWORD');
      const result: ValidationErrors = <ValidationErrors>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toEqual(mockedValidationError);
    });

    it('should check password if password is up to the chosen standards should return null ', () => {
      mockedFirstNameControl = new FormControl('jamal');
      mockedLastNameControl = new FormControl('saleh');
      mockedPasswordControl = new FormControl('P@ssw0rd');
      const result: ValidationErrors = <ValidationErrors>(
        service.ValidatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
          mockedPasswordControl
        )(mockedPasswordControl)
      );
      expect(result).toBeNull();
    });
  });
  describe('verifyEmailAsync', (): void => {
    beforeEach(() => {
      intializeTestParams();
    });
    it('should return not exist validation error when mx_found is false', (done: DoneFn): void => {
      verifyEmailObservable=of({
        ...MockDataVerification,
        mx_found:false,
      });
      mockedApiService.verifyEmail.and.returnValue(
        <Observable<EmailVerification>>verifyEmailObservable
      );
      (<Observable<ValidationErrors>>(
        service.verifyEmailAsync(mockedEmailControl)
      )).subscribe((result: ValidationErrors): void => {
        expect(result).toEqual(mockedEmailDoesNotExisit);
        done();
      });
    });


    it('should return not exist validation error when smtp_check is false', (done: DoneFn): void => {
      verifyEmailObservable=of({
        ...MockDataVerification,
        smtp_check:false,
      });
      mockedApiService.verifyEmail.and.returnValue(
        <Observable<EmailVerification>>verifyEmailObservable
      );
      (<Observable<ValidationErrors>>(
        service.verifyEmailAsync(mockedEmailControl)
      )).subscribe((result: ValidationErrors): void => {
        expect(result).toEqual(mockedEmailDoesNotExisit);
        done();
      });
    });
    it('should return null when smtp_check is true and mx_found is true', (done: DoneFn): void => {
      verifyEmailObservable=of({
        ...MockDataVerification,
        smtp_check:true,
        mx_found:true,
      });
      mockedApiService.verifyEmail.and.returnValue(
        <Observable<EmailVerification>>verifyEmailObservable
      );
      (<Observable<ValidationErrors>>(
        service.verifyEmailAsync(mockedEmailControl)
      )).subscribe((result: ValidationErrors): void => {
        expect(result).toEqual(mockedEmailDoesNotExisit);
        done();
      });
    });
  });
});
