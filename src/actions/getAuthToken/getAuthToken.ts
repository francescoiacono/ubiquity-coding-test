'use server';

import urlJoin from 'url-join';
import { AuthToken } from '@/types/AuthToken';
import { getVariables } from './utils/getVariables';

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
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: API_USERNAME,
      password: API_PASSWORD,
    }),
  });

  // Throw an error if the request was not successful.
  if (!response.ok) {
    throw new Error('Failed to get auth token');
  }

  // Parse the response data as JSON and return it.
  const data: AuthToken = await response.json();
  return data;
}
