'use server';

import urlJoin from 'url-join';
import { AuthToken } from '@/types/AuthToken';
import { getVariables } from './utils/getVariables';
import { httpFetch } from '@/utils/httpFetch/httpFetch';
import { setCookie } from '@/utils/setCookie';

/**
 * Retrieves an authentication token from the API.
 * @returns The authentication token.
 * @throws Error if the API_URL environment variable is
 * not set or if there is an error retrieving the token.
 */
export async function getAuthToken() {
  const { API_URL, API_USERNAME, API_PASSWORD } = getVariables();

  // Format the URL for the API token endpoint.
  const apiUrl = urlJoin(API_URL, 'token/');

  // Fetch the token from the API.
  const response = await httpFetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: API_USERNAME,
      password: API_PASSWORD,
    }),
  });

  // Parse the response data as JSON and return it.
  const data: AuthToken = await response.json();

  // Set the access and refresh tokens as cookies.
  setCookie('accessToken', data.access);
  setCookie('refreshToken', data.refresh, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return data;
}
