'use client';

import { getAuthToken } from '@/actions/getAuthToken';
import { AuthToken } from '@/types/AuthToken';
import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState<AuthToken | null>(null);

  const handleSubmit = async () => {
    const fetchedToken: AuthToken = await getAuthToken();
    console.log('fetchedToken', fetchedToken);
    setToken(fetchedToken);
  };

  return (
    <main>
      Hello World!
      <form action={handleSubmit}>
        <button type='submit'>Get Token</button>
      </form>
      <pre>{JSON.stringify(token, null, 2)}</pre>
    </main>
  );
}
