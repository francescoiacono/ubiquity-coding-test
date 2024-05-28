'use client';

import { getSubmissionResults } from '@/actions/getSubmissionResults';
import { Heading } from '@/components/ui/heading';
import { useAuth } from '@/providers/authProvider/useAuth';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ResultsList } from './resultsList';
import { SortingResultsSelect } from './sortingResultsSelect';
import { SubmissionResponse } from '@/types/SubmissionResponse';
import { ResultsProvider } from '@/providers/resultsProvider';
import { ResultsFilters } from './resultsFilters';
import styles from './resultsContent.module.css';

interface ResultsContentState {
  data: SubmissionResponse[] | null;
  loading: boolean;
  error: string | null;
}

export const ResultContent = () => {
  const auth = useAuth();
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');

  const [state, setState] = useState<ResultsContentState>({
    data: null,
    loading: false,
    error: null,
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

      // Hide loading state
      setState({ loading: false, error: null, data: data.answer_text });
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      console.error(message);
      setState({ loading: false, error: message, data: null });
    }
  }, [auth.data?.cookies?.accessToken, submissionId, state.loading]);

  // When the component mounts, fetch the submission results
  useEffect(() => {
    fetchSubmissionResults();
  }, [submissionId]);

  return (
    <div>
      {state.loading && <pre>Loading...</pre>}
      {state.error && <div>Error: {state.error}</div>}
      {state.data && (
        <ResultsProvider results={state.data}>
          <div className={styles.container}>
            <header className={styles.header}>
              <Heading>Results</Heading>
              <SortingResultsSelect />
            </header>
            <div className={styles.content}>
              <aside className={styles.aside}>
                <ResultsFilters />
              </aside>
              <main className={styles.main}>
                <ResultsList />
              </main>
            </div>
          </div>
        </ResultsProvider>
      )}
    </div>
  );
};
