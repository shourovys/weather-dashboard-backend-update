import { Request } from 'express';

export interface UserAuthRequest extends Request {
  user?: IUser;
  token?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}
