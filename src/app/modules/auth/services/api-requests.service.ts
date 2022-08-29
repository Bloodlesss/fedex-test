import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user-info';
import { environment } from 'src/environments/environment';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { EmailVerification } from 'src/app/shared/models/email-verification';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private readonly httpClient: HttpClient) {}
  public userSignUp(userInfo: UserInfo): Observable<SignedUpUser> {
    return this.httpClient.post<SignedUpUser>(
      environment.signUpApiUrl,
      userInfo
    );
  }
  public verifyEmail(email: string): Observable<EmailVerification> {
    return this.httpClient.get<EmailVerification>(
      `${environment.emailVerificationUrl}`,
      {
        headers:{
          apikey:environment.emailVerificationKey
        },
        params: {
          email: email,
        },
      }
    );
  }
}
