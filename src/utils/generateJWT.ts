import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';

export const generateJWT = (user: IUser, secret: string, expiresIn: string) => {
  if (!secret) {
    console.log('🚀 ~ secret:', secret);
    throw new Error('Secret key is not defined');
  }
  return jwt.sign(user, secret, { expiresIn });
};
