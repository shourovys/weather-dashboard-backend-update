import express, { NextFunction, Request, Response, Router } from 'express';
import { getAccessToken, getUserData } from '../controllers/github-controller';
import { generateAuthTokens } from '../middlewares/auth';
import { UserAuthRequest } from '../types/user';

const router: Router = express.Router();

router.get('/accessToken', (req: Request, res: Response) => {
  const code = req.query.code;
  getAccessToken(code as string).then((resp) => res.json(resp));
});

router.get(
  '/userData',
  async (req: UserAuthRequest, res: Response, next: NextFunction) => {
    try {
      const code = req.query.code;

      // Get user data from Google
      const userData = await getUserData(code as string);

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
