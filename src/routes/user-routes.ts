import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../config';
import { verifyJWT } from '../middlewares/auth';
import { UserAuthRequest } from '../types/user';
import { generateJWT } from '../utils/generateJWT';

const router = express.Router();

// Middleware to verify JWT and attach user to request
// router.use(verifyJWT);

// Fetch user details
router.get('/me', verifyJWT, async (req: UserAuthRequest, res: Response) => {
  try {
    // Assuming req.user was populated by verifyJWT middleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user,
      token: req.token,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

//  Refresh access token
router.get('/refreshToken', async (req: Request, res: Response) => {
  try {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    if (!refreshToken) {
      return res.status(402).json({ message: 'No refresh token provided' });
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate new access token
        const accessToken = generateJWT(
          decoded,
          ACCESS_TOKEN_SECRET,
          ACCESS_TOKEN_LIFE
        );

        return res.status(200).json({
          user: decoded,
          token: accessToken,
        });
      }
    );
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
