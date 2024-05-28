import { SubmissionResponse } from '@/types/SubmissionResponse';

/**
 * Splits the languages from the given array of submission results.
 * @param results - The array of submission results.
 * @returns A Set containing the unique languages extracted from the submission results.
 */
export const splitLanguages = (results: SubmissionResponse[]) => {
  return new Set(
    results
      .filter((result) => result.metadata.language)
      .flatMap((result) =>
        result.metadata.language.split(';').map((lang) => lang.trim())
      )
  );
};
