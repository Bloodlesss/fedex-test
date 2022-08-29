import { trigger } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Constants } from 'src/app/shared/enums/constants';
import { Spied } from 'src/specs/utils.type';

import { FieldErrorsLabelComponent } from './field-errors-label.component';

describe('FieldErrorsLabelComponent', () => {
  let component: FieldErrorsLabelComponent;
  let fixture: ComponentFixture<FieldErrorsLabelComponent>;
  const mockedfield: string = 'field';
  const mockedFormController: AbstractControl = new FormControl('');

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [FieldErrorsLabelComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FieldErrorsLabelComponent);
    component = fixture.componentInstance;
    component.field = mockedfield;
    component.formController = mockedFormController;

    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should call mark for check on formController valueChanges ', () => {
      const spy = spyOn((component as any).changeRef, 'detectChanges');
      mockedFormController.patchValue('test');
      expect(spy).toHaveBeenCalled();
    });
  });
});
