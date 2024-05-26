'use client';

import styles from './homeContent.module.css';
import { Heading } from '@/components/ui/heading';
import { SubmissionPayload } from '@/types/SubmissionPayload';
import { createSubmission } from '@/actions/createSubmission/createSubmission';
import { SubmissionForm } from './submissionForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface StateProps {
  loading: boolean;
  error: string | null;
}

export const HomeContent = () => {
  const [state, setState] = useState<StateProps>({
    loading: false,
    error: null,
  });
  const router = useRouter();

  /**
   * Handles the submission of the form.
   *
   * @param accessToken - The access token for authentication.
   * @param ip - The IP address of the user.
   * @param submission - The payload of the submission.
   * @throws If the access token is not provided or empty.
   * @throws If the IP address is not provided or empty.
   */
  const handleSubmit = async (
    accessToken: string,
    submission: SubmissionPayload
  ) => {
    try {
      // Don't submit if already loading
      if (state.loading) return;

      // Show loading state
      setState({ loading: true, error: null });

      // Create the submission and redirect to the results page
      const sub = await createSubmission(accessToken, submission);
      router.push(`/results?id=${sub.pk}`);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      console.error(message);
      setState({ loading: false, error: message });
    }
  };

  return (
    <div className={styles.container}>
      <Heading className={styles.heading}>JournalMatcher</Heading>
      {state.error && <div className={styles.error}>{state.error}</div>}
      <SubmissionForm loading={state.loading} onSubmit={handleSubmit} />
    </div>
  );
};
