import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpState } from 'src/app/shared/enums/sign-up-state';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockedUserInfo: SignedUpUser  ={
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  let mockedState:string=SignUpState.signUp;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.state=mockedState;
    component.userInfo=mockedUserInfo;
    fixture.detectChanges();
  });

  describe('onSubmit', () => {
    it('should update userInfo and state', () => {
      expect(component.userInfo).toHaveBeenCalled();
    });
  });
});
