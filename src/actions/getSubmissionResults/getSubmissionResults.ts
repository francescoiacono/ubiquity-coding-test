'use server';

import { SubmissionResponse } from '@/types/SubmissionResponse';
import { httpFetch } from '@/utils/httpFetch/httpFetch';
import urlJoin from 'url-join';

interface SubmissionOptions {
  items: number;
}

export interface SubmissionResults {
  answer_text: SubmissionResponse[];
}

/**
 * Retrieves the submission results from the API.
 * @param accessToken - The access token for authentication.
 * @param submissionId - The ID of the submission.
 * @returns A Promise that resolves to the JSON response from the API.
 * @throws An error if the API_URL environment variable is not defined.
 */
export const getSubmissionResults = async (
  accessToken: string,
  submissionId: string,
  options: SubmissionOptions = { items: 30 }
): Promise<SubmissionResults> => {
  const API_URL = process.env.API_URL;
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }

  // Format the URL for the API submission endpoint.
  const url = urlJoin(API_URL, `/results`);
  const params = new URLSearchParams({
    items: options.items.toString(),
    submission_id: submissionId,
  });
  const apiUrl = `${url}?${params}`;

  // Create the submission using the API.
  const response = await httpFetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
