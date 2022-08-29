import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { ApiRequestsService } from './api-requests.service';
import { UserInfo } from 'src/app/shared/models/user-info';
import {
  MockDataVerification,
  mockuserData,
  userInfoData,
} from 'src/specs/mock-data';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiRequestsService', () => {
  let service: ApiRequestsService;
  let mockedHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiRequestsService],
    });
    service = TestBed.inject(ApiRequestsService);
    mockedHttp = TestBed.inject(HttpTestingController);
  });
  afterEach((): void => {
    mockedHttp.verify();
  });

  describe('signUp', (): void => {
    it('should sign Up the user then return the User Details with ID', (done: DoneFn): void => {
      const signUpDetails: UserInfo = userInfoData;

      service
        .userSignUp(signUpDetails)
        .subscribe((user: SignedUpUser): void => {
          expect(user).toEqual(mockuserData);
          done();
        });

      const signUpRequest: TestRequest = mockedHttp.expectOne({
        method: 'POST',
        url: `${environment.signUpApiUrl}`,
      });

      expect(signUpRequest.request.method).toEqual('POST');
      signUpRequest.flush(mockuserData);

      mockedHttp.verify();
    });
    it('should throw error when post user request fails', (done: DoneFn): void => {
      const signUpDetails: UserInfo = userInfoData;
      const error: string = 'ERROR';
      service.userSignUp(signUpDetails).subscribe(
        (): null => null,
        (err: HttpErrorResponse): void => {
          expect(err.statusText).toEqual(error);

          done();
        });

      const signUpRequest: TestRequest = mockedHttp.expectOne({
        method: 'POST',
        url: `${environment.signUpApiUrl}`,
      });

      signUpRequest.error(new ErrorEvent(error), { statusText: error });

      mockedHttp.verify();
    });
  });
  describe('verifyEmail', (): void => {
    it('should return email details', (done: DoneFn): void => {
      service
        .verifyEmail(userInfoData.email)
        .subscribe((verifyEmail: unknown): void => {
          expect(verifyEmail).toEqual(MockDataVerification);
          done();
        });

      const verifyEmailRequest: TestRequest = mockedHttp.expectOne(
        `${environment.emailVerificationUrl}?email=${userInfoData.email}`
      );

      verifyEmailRequest.flush(MockDataVerification);

      mockedHttp.verify();
    });
  });
});
