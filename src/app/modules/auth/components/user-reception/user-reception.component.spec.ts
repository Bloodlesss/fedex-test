import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { mockuserData } from 'src/specs/mock-data';

import { UserReceptionComponent } from './user-reception.component';

describe('UserReceptionComponent', () => {
  let component: UserReceptionComponent;
  let fixture: ComponentFixture<UserReceptionComponent>;
  const mockedUserInfo: SignedUpUser = mockuserData;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReceptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserReceptionComponent);
    component = fixture.componentInstance;
    component.userInfo = mockedUserInfo;
    fixture.detectChanges();
  });

  describe('changeState', () => {
    it('should emit when onClick() is called', () => {
      spyOn(component.changeState, 'emit');
      component.goBack(); // call the onClick method directly
      expect(component.changeState.emit).toHaveBeenCalledWith();
    });
  });
});
