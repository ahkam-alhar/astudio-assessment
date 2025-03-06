import { IProduct } from './product.types';
import { IUser } from './user.types';

export interface IResponse<T = IUser | IProduct> {
  users: T[];
  total: number;
  skip: number;
  limit: number;
}
