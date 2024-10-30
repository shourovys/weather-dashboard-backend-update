import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { COOKIE_SECRET, GITHUB_CLIENT_ID } from './config';

import githubRoutes from './routes/github-routes';
import googleRoutes from './routes/google-routes';
import userRoutes from './routes/user-routes';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://weather-dashboard-by-shourov.vercel.app',
    ],
    credentials: true,
  })
);

// Use cookie-parser middleware
app.use(cookieParser(COOKIE_SECRET));

app.use(express.json());

app.use('/api/github', githubRoutes);
app.use('/api/google', googleRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send(`env variable check: ${GITHUB_CLIENT_ID}`);
});

export default app;
