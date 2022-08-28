import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { UserInfo } from 'src/app/shared/models/user-info';

@Component({
  selector: 'fed-user-reception',
  templateUrl: './user-reception.component.html',
  styleUrls: ['./user-reception.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserReceptionComponent implements OnInit {
  @Input() userInfo!:SignedUpUser;
  @Output() changeState: EventEmitter<void> =
  new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  goBack(){
    this.changeState.emit();
  }
}
