'use client';

import { getAuthCookies } from '@/actions/getAuthCookies';
import { getAuthTokens } from '@/actions/getAuthTokens';
import { AuthCookies } from '@/types/AuthCookies';
import { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextProps {
  cookies: AuthCookies | null;
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
    cookies: null,
    loading: true,
    error: '',
  });

  /**
   * Retrieves the authorization status and updates the state accordingly.
   */
  const getIsAuthorized = useCallback(async () => {
    try {
      let cookies = getAuthCookies();
      if (cookies) {
        setState({ cookies, loading: false, error: '' });
      } else {
        cookies = await getAuthTokens();
        setState({ cookies, loading: false, error: '' });
      }
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setState({ cookies: null, loading: false, error: message });
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
