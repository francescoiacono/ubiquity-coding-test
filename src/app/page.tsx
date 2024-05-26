'use client';

import { getAuthTokens } from '@/actions/getAuthTokens';
import { AuthCookies } from '@/types/AuthCookies';
import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState<AuthCookies | null>(null);

  const handleSubmit = async () => {
    const fetchedToken = await getAuthTokens();
    console.log('fetchedToken', fetchedToken);
    setToken(fetchedToken);
  };

  return (
    <>
      <form action={handleSubmit}>
        <button type='submit'>Get Token</button>
      </form>
      <pre>{JSON.stringify(token, null, 2)}</pre>
    </>
  );
}
