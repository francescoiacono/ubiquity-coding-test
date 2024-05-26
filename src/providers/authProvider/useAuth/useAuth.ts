'use client';

import { useContext } from 'react';
import { AuthContext } from '..';

/**
 * Custom hook that provides access to the authentication context.
 * @returns The authentication context.
 * @throws If used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
