'use client';

import {
  SubmissionResults,
  getSubmissionResults,
} from '@/actions/getSubmissionResults';
import { Heading } from '@/components/ui/heading';
import { useAuth } from '@/providers/authProvider/useAuth';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ResultTable } from './resultsTable';
import styles from './resultsContent.module.css';

interface ResultsContentState {
  loading: boolean;
  error: string | null;
  data: SubmissionResults | null;
}

export const ResultContent = () => {
  const auth = useAuth();
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');

  const [state, setState] = useState<ResultsContentState>({
    loading: false,
    error: null,
    data: null,
  });

  /**
   * Fetches the submission results.
   * @returns A promise that resolves when the submission results are fetched.
   */
  const fetchSubmissionResults = useCallback(async () => {
    try {
      // Don't fetch if already loading
      if (state.loading) return;

      // Throw an error if the submission ID is missing
      if (!submissionId) throw new Error('Submission ID is null');

      // Show loading state
      setState({ loading: true, error: null, data: null });

      // Fetch the submission results
      const data = await getSubmissionResults(
        auth.data?.cookies?.accessToken || '',
        submissionId
      );
      setState({ loading: false, error: null, data });
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      console.error(message);
      setState({ loading: false, error: message, data: null });
    }
  }, [auth.data?.cookies?.accessToken, submissionId, state.loading]);

  // Fetch the submission results when the submission ID changes
  useEffect(() => {
    fetchSubmissionResults();
  }, [submissionId]);

  return (
    <div>
      {state.loading && <pre>Loading...</pre>}
      {state.error && <div>Error: {state.error}</div>}
      {state.data && (
        <div className={styles.container}>
          <Heading>Results</Heading>
          <ResultTable data={state.data.answer_text} />
        </div>
      )}
    </div>
  );
};
