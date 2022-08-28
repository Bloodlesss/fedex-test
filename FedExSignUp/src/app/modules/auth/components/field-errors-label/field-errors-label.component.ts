import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { Constants } from 'src/app/shared/enums/constants';

@Component({
  selector: 'fed-field-errors-label',
  templateUrl: './field-errors-label.component.html',
  styleUrls: ['./field-errors-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorsLabelComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() field!: Constants;
  public constants = Constants;
  public formControl!: FormControl;
  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.formControl = <FormControl>this.formGroup.get(this.field);
    console.log(
      this.constants.FirstName === this.field &&
        this.formGroup.invalid &&
        (this.formGroup.dirty || this.formGroup.touched)
    );
    merge(
      this.formControl.valueChanges,
      this.formControl.statusChanges
    ).subscribe((): void => {
      this.changeRef.markForCheck();
    });
  }
}
