import { FilterParams, IResponse } from './common.types';

export interface IUserResponse extends IResponse {
  users: IUser[];
}

export interface IUserTable extends IUser {
  country: string;
}

export interface UserFilterParams extends FilterParams {
  key?: string;
  value?: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  address: Address;
  bloodGroup: string;
  eyeColor: string;
  university: string;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
