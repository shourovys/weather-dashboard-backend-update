import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
} from '../config';
import { IUser, UserAuthRequest } from '../types/user';
import { generateJWT } from '../utils/generateJWT';

export const generateAuthTokens = async (
  req: UserAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user!;

    // Generate refresh token
    const refreshToken = generateJWT(
      user,
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_LIFE
    );

    // Generate access token
    const accessToken = generateJWT(
      user,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_LIFE
    );

    // Set refresh token as HttpOnly cookie (security best practice)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(NODE_ENV === 'development'),
      signed: true,
      expires: new Date(Date.now() + ms(REFRESH_TOKEN_LIFE)),
    });

    // Set expiration time for the access token
    const expiresAt = new Date(Date.now() + ms(ACCESS_TOKEN_LIFE));

    // Send the access token and expiration time as response
    return res.status(200).json({
      user: req.user,
      token: accessToken,
      expiresAt,
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyJWT = (
  req: UserAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401).json({ message: 'Unauthorized' }); // Unauthorized
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user as IUser; // Attach user info to request
    req.token = token;
    next();
  });
};
