'use client';

import { createSubmission } from '@/actions/createSubmission/createSubmission';
import {
  SubmissionResults,
  getSubmissionResults,
} from '@/actions/getSubmissionResults';
import { useAuth } from '@/providers/authProvider/useAuth';
import { SubmissionPayload } from '@/types/SubmissionPayload';
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState<SubmissionResults>();
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
    const results = await getSubmissionResults(accessToken, sub.pk);

    setResults(results);
  };

  return (
    <>
      <form action={handleSubmit}>
        <button type='submit'>Create Submission</button>
      </form>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </>
  );
}
