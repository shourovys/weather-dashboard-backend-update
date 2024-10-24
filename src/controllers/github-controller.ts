import axios from 'axios';
import * as dotenv from 'dotenv';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config';

dotenv.config();

type AccessTokenData = {
  access_token: string;
  token_type: string;
  scope: string;
} | null;

export const getAccessToken = async (
  code: string
): Promise<AccessTokenData> => {
  try {
    const params = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;

    console.log('🚀 ~ params:', params);
    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return data;
  } catch (error) {
    // console.log('🚀 ~ error:', error);
    return null;
  }
};

export const getUserData = async (code: string) => {
  try {
    console.log('🚀 ~ getUserData ~ code:', code);
    const params = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;

    const {
      data: { access_token: accessToken },
    } = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    console.log('🚀 ~ getUserData ~ accessToken:', accessToken);

    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      id: data.id,
      name: data.name,
      email: data.id,
      picture: data.avatar_url,
    };
  } catch (error) {
    console.log('🚀 ~ getUserData ~ error:', error);
    throw new Error('Invalid Code');
  }
};
