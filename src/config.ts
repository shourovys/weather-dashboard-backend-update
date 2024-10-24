export const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  '3cb0150fa5bfa60f905cd4c93fa173ccf8db53057333c07124eeac0e1858baba';
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  'b97040afe6d085eea5f2180b5f1f661b78f95a774a5e1c104d7ea5d9210952a7';
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  'd0efc43e5fe3b29bbb01c858eb365dcd388c4261ad258082ff8f3eeb05daf876';
export const ACCESS_TOKEN_LIFE = '15m'; // Access token valid for 15 minutes
export const REFRESH_TOKEN_LIFE = '7d'; // Refresh token valid for 7 days

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 5000;
