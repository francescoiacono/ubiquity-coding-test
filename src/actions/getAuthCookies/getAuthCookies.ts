'use server';

import { getCookie } from '@/utils/getCookie';
import { CookieNames } from '@/types/CookieNames';
import { AuthCookies } from '@/types/AuthCookies';

/**
 * Retrieves the authentication cookies.
 * @returns An object containing the access token and refresh token
 * if both are present in the cookies, otherwise null.
 */
export const getAuthCookies = async (): Promise<AuthCookies | null> => {
  const accessToken = getCookie(CookieNames.ACCESS_TOKEN);
  const refreshToken = getCookie(CookieNames.REFRESH_TOKEN);

  if (!accessToken || !refreshToken) {
    return null;
  }
  return {
    accessToken,
    refreshToken,
  };
};
