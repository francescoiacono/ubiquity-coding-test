'use client';

import { getAuthCookies } from '@/actions/getAuthCookies';
import { getAuthTokens } from '@/actions/getAuthTokens';
import { getIpAddress } from '@/actions/getIpAddress';
import { AuthCookies } from '@/types/AuthCookies';
import { createContext, useCallback, useEffect, useState } from 'react';

interface AuthData {
  cookies: AuthCookies | null;
  ip: string | null;
}

interface AuthContextProps {
  data: AuthData | null;
  loading: boolean;
  error: string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Context for managing authentication state.
 * This context provides the authentication state and related functions to its descendants.
 */
export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthContextProps>({
    data: null,
    loading: true,
    error: '',
  });

  /**
   * Retrieves the authorization status and updates the state accordingly.
   */
  const getIsAuthorized = useCallback(async () => {
    try {
      const data: AuthData = {} as AuthData;

      // Get the auth cookies from the browser
      data.cookies = (await getAuthCookies()) || (await getAuthTokens());

      // Get the IP address
      data.ip = await getIpAddress();

      // Update the state
      setState({ data, loading: false, error: '' });
    } catch (error) {
      // Throw the error and update the state
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  useEffect(() => {
    if (state.loading) {
      getIsAuthorized();
    }
  }, [getIsAuthorized, state.loading]);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};
