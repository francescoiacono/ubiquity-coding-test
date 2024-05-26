'use client';

import { useAuth } from '@/providers/authProvider/useAuth';

interface AuthScreenProps {
  children: React.ReactNode;
}

/**
 * AuthScreen component.
 *
 * @component
 * @param {AuthScreenProps} props - The props for the AuthScreen component.
 * @returns {JSX.Element} The rendered AuthScreen component.
 */
export const AuthScreen: React.FC<AuthScreenProps> = ({ children }) => {
  const { cookies, loading, error } = useAuth();

  if (loading) {
    return <pre>Loading...</pre>;
  }
  if (error) {
    return <pre>{error}</pre>;
  }
  if (!cookies) {
    return <pre>Unauthorized</pre>;
  }

  return <>{children}</>;
};
