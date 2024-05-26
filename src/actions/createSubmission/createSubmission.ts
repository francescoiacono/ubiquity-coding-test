'use server';

import urlJoin from 'url-join';
import { SubmissionPayload } from '@/types/SubmissionPayload';
import { httpFetch } from '@/utils/httpFetch/httpFetch';

/**
 * Creates a submission using the provided token and payload.
 * @param token - The authentication token.
 * @param payload - The payload data for the submission.
 * @returns - A promise that resolves to the ID of the created submission.
 * @throws - If API_URL is not defined.
 */
export const createSubmission = async (
  token: string,
  payload: SubmissionPayload
) => {
  const API_URL = process.env.API_URL;
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }

  // Format the URL for the API submission endpoint.
  const apiUrl = urlJoin(API_URL, '/submissions');

  // Create the submission using the API.
  const response = await httpFetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...payload }),
  });

  return await response.json();
};
