import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SignUpState } from 'src/app/shared/enums/sign-up-state';
import { SignedUpUser } from 'src/app/shared/models/signed-up-user';

@Component({
  selector: 'fed-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public userInfo: SignedUpUser = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  public state: string = SignUpState.signUp;
  public stateEnum = SignUpState;
  constructor() {}

  ngOnInit(): void {}
  onSubmit(info: SignedUpUser) {
    this.userInfo = info;
    this.state = this.stateEnum.showUser;
  }
  changeStateToSignUp() {
    this.state = SignUpState.signUp;
  }
}
