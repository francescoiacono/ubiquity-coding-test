'use client';

import urlJoin from 'url-join';
import { httpFetch } from '@/utils/httpFetch/httpFetch';
import { IpAddressResponse } from '@/types/IpAddressResponse';

/**
 * Retrieves the client's IP address from the API.
 * @returns The client's IP address.
 * @throws Error if the NEXT_PUBLIC_LOCAL_URL environment variable is not set.
 */
export const getIpAddress = async () => {
  const rootUrl = process.env.NEXT_PUBLIC_LOCAL_URL;
  if (!rootUrl) {
    throw new Error(
      'The NEXT_PUBLIC_LOCAL_URL environment variable is not set.'
    );
  }

  // Format the URL for the API IP address endpoint.
  const apiUrl = urlJoin(rootUrl, 'ip/');

  // Fetch the client IP address from the API.
  const response = await httpFetch(apiUrl, {
    method: 'GET',
  });

  // Parse the response data as JSON and return the IP address.
  const data: IpAddressResponse = await response.json();
  return data.ip;
};
