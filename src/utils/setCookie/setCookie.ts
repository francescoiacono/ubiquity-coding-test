'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

/**
 * Set a cookie on the client.
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param options Options for the cookie.
 */
export const setCookie = (
  name: string,
  value: string,
  options: Partial<ResponseCookie> = {}
) => {
  cookies().set(name, value, options);
};
