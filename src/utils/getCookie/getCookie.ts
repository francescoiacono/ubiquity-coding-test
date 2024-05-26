import { cookies } from 'next/headers';
import { CookieNames } from '@/types/CookieNames/CookieNames';

/**
 * Retrieves the value of a cookie by its name.
 * @param name - The name of the cookie.
 * @returns The value of the cookie, or undefined if the cookie doesn't exist.
 */
export const getCookie = (name: CookieNames) => {
  return cookies().get(name)?.value;
};
