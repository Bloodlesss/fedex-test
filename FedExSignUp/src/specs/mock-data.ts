import { SignedUpUser } from 'src/app/shared/models/signed-up-user';
import { UserInfo } from 'src/app/shared/models/user-info';

export const MockDataVerification: any = {
  email: 'jamal.ngu@gmail.com',
  did_you_mean: '',
  user: 'jamal',
  domain: 'gmail.com',
  format_valid: true,
  mx_found: true,
  smtp_check: true,
  catch_all: true,
  role: true,
  disposable: true,
  free: true,
  score: 1,
};

export const userInfoData: UserInfo = {
  firstName: 'jamal',
  lastName: 'saleh',
  email: 'gmail.com',
  password: 'P@ssw0rd',
};
export interface usertype {
  pending: boolean;
  user: {} | null;
}
export const mockuserData: SignedUpUser = {
  _id: '1',
  firstName: 'jamal',
  lastName: 'saleh',
  email: 'jamal.ngu@gmail.com',
};
export const authData: usertype = {
  pending: false,
  user: mockuserData,
};
