import { UserDetailsResponse } from '@/models/userModel';
import axios from 'axios';

const userapi = process.env.NEXT_PUBLIC_AUTHSERVICE_URL;

const getIdToken = (): string => {
  const cookies = document.cookie
    .split('; ')
    .reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);
  return cookies['idToken'];
};

const getaccessToken = (): string => {
  const cookies = document.cookie
    .split('; ')
    .reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);
  return cookies['accessToken'];
};


export const getUserDetails = async (): Promise<UserDetailsResponse> => {
  try {
  
    const idToken = getIdToken();
    const accessToken = getaccessToken();
    
    if (!accessToken || !idToken) {
      throw new Error('Missing authentication tokens');
    }

    const response = await axios.get(
      `${userapi}/getUserDetails`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          access_token: accessToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
