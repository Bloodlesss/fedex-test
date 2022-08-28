import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorsLabelComponent } from './field-errors-label.component';

describe('FieldErrorsLabelComponent', () => {
  let component: FieldErrorsLabelComponent;
  let fixture: ComponentFixture<FieldErrorsLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldErrorsLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorsLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
