import { Observable } from 'rxjs';

export type Primitive = number | string | boolean | object;

export type Spied<T> = jasmine.SpyObj<T> & {
  [key: string]: Primitive | Observable<any>;
};
