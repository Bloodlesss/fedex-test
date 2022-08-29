import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpState } from 'src/app/shared/enums/sign-up-state';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { mockuserData } from 'src/specs/mock-data';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockedUserInfo: SignedUpUser = mockuserData;
  let mockedState: string = SignUpState.signUp;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.state = mockedState;
    component.userInfo = mockedUserInfo;
    fixture.detectChanges();
  });

  describe('onSubmit', () => {
    it('should update userInfo and state', () => {
      component.onSubmit(mockedUserInfo);
      expect(component.userInfo).toEqual(mockedUserInfo);
      expect(component.state).toEqual(SignUpState.showUser);
    });
  });
  describe('changeStateToSignUp', () => {
    it('should update state to SignUp', () => {
      component.changeStateToSignUp();
      expect(component.state).toEqual(SignUpState.signUp);
    });
  });
});
