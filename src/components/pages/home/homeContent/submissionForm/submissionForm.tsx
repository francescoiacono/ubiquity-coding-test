'use client';

import styles from './submissionForm.module.css';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/providers/authProvider/useAuth';
import { SubmissionPayload } from '@/types/SubmissionPayload';
import { useState } from 'react';

interface SubmissionFormProps {
  onSubmit: (
    accessToken: string,
    submission: SubmissionPayload
  ) => Promise<void>;
  loading: boolean;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onSubmit,
  loading,
}) => {
  const auth = useAuth();
  const [submissionData, setSubmissionData] = useState<SubmissionPayload>({
    title: '',
    abstract: '',
    ip_address: auth.data?.ip || '',
    source_website: 'DEGRUYTER',
    language: 'English',
  });

  /**
   * Updates the submission data with the provided key-value pair.
   *
   * @param key - The key of the submission data to update.
   * @param value - The new value for the specified key.
   */
  const updateSubmissionData = (
    key: keyof SubmissionPayload,
    value: string
  ) => {
    setSubmissionData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Handles the change event for input and textarea elements.
   * Updates the submission data with the new value.
   *
   * @param e - The change event object.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateSubmissionData(
      e.target.id as keyof SubmissionPayload,
      e.target.value
    );
  };

  /**
   * Handles the submission of the form.
   *
   * @param e - The form event object.
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await onSubmit(auth.data?.cookies?.accessToken || '', submissionData);
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label='Title'
        id='title'
        type='text'
        placeholder='Enter the title of your paper'
        onChange={handleChange}
      />
      <Textarea
        label='Abstract'
        id='abstract'
        placeholder='Enter the abstract of your paper'
        onChange={handleChange}
      />
      <Button type='submit' loading={loading}>
        Find Matches
      </Button>
    </Form>
  );
};
