import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReceptionComponent } from './user-reception.component';

describe('UserReceptionComponent', () => {
  let component: UserReceptionComponent;
  let fixture: ComponentFixture<UserReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
