import axios from 'axios';

export const getUserData = async (accessToken: string) => {
  try {
    // Step 1: Make a request to the Google People API with the accessToken
    const googleResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json', // Google People API endpoint for user info
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { id, name, email, picture } = googleResponse.data;

    const user = {
      id,
      name,
      email,
      picture,
    };

    return user;
  } catch (error) {
    console.error('Error fetching user data from Google API:', error);
    throw new Error('Failed to fetch user data');
  }
};
