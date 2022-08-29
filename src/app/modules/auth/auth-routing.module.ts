import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReceptionComponent } from './components/user-reception/user-reception.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule {}
