import dotenv from 'dotenv';
import app from './src/app';
import { PORT } from './src/config';
dotenv.config();

console.log('🚀 ~ app.listen ~ PORT:', PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
