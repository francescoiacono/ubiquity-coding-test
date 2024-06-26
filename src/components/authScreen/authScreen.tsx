'use client';

import { useAuth } from '@/providers/authProvider/useAuth';
import { CircularLoading } from '../ui/circularLoading';

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
  const { data, loading, error } = useAuth();

  if (loading) {
    return <CircularLoading />;
  }
  if (error) {
    return <pre>{error}</pre>;
  }
  if (!data?.cookies) {
    return <pre>Unauthorized</pre>;
  }

  return <>{children}</>;
};
