'use client';

import { createSubmission } from '@/actions/createSubmission/createSubmission';
import { getAuthTokens } from '@/actions/getAuthTokens';
import { useAuth } from '@/providers/authProvider/useAuth';
import { SubmissionPayload } from '@/types/SubmissionPayload';
import { useState } from 'react';

export default function Home() {
  const [subData, setSubData] = useState(null);
  const { data } = useAuth();

  const handleSubmit = async () => {
    if (!data) {
      throw new Error('No data found');
    }
    const submission: SubmissionPayload = {
      title: 'My Submission',
      abstract: 'This is my submission.',
      ip_address: data.ip || '',
      language: 'English',
      source_website: 'DEGRUYTER',
    };

    const accessToken = data.cookies?.accessToken || '';

    const sub = await createSubmission(accessToken, submission);
    setSubData(sub);
  };

  return (
    <>
      <form action={handleSubmit}>
        <button type='submit'>Create Submission</button>
      </form>
      <pre>{JSON.stringify(subData, null, 2)}</pre>
    </>
  );
}
