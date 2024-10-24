import express, { NextFunction, Response, Router } from 'express';
import { getUserData } from '../controllers/google-controller';
import { generateAuthTokens } from '../middlewares/auth';
import { UserAuthRequest } from '../types/user';

const router: Router = express.Router();

router.get(
  '/userData',
  async (req: UserAuthRequest, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.query.accessToken as string;

      // Get user data from Google
      const userData = await getUserData(accessToken);

      // Attach the user data to the request object for further processing
      req.user = userData;

      // Proceed to the next middleware to generate tokens
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid ID Token' });
    }
  },
  generateAuthTokens // This middleware will now receive the req.user containing user data
);

export default router;
