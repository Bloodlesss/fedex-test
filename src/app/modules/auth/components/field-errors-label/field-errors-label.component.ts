import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Constants } from 'src/app/shared/enums/constants';

@Component({
  selector: 'fed-field-errors-label',
  templateUrl: './field-errors-label.component.html',
  styleUrls: ['./field-errors-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorsLabelComponent implements OnInit {
  @Input() field!: string;
  public constants = Constants;
  @Input() formController!: AbstractControl | null;
  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.formController?.valueChanges.subscribe((): void => {
      this.changeRef.detectChanges();
    });
  }
  toUpperCase(value:string){
    return value.replace(/([A-Z])/g, ' $1')
  .replace(/^./, (str) => {
    return str.toUpperCase();
  })

  }
}
