import { SubmissionResponse } from '@/types/SubmissionResponse';

export type JournalAccess = 'yes' | 'no' | 'hybrid';

export interface FilterOptions {
  languages?: string[];
  openAccess?: JournalAccess[];
}

/**
 * Filters an array of submission results based on the provided filter options.
 * @param results - The array of submission results to filter.
 * @param options - The filter options to apply.
 * @returns The filtered array of submission results.
 */
export const filter = (
  results: SubmissionResponse[],
  options: FilterOptions
): SubmissionResponse[] => {
  return results.filter((result) => {
    // Create an array of languages from the result metadata
    const resultLanguages = result.metadata.language
      ?.split(';')
      .map((lang) => lang.trim());

    // Check if the result matches the filter options
    const matchesLanguage =
      options.languages?.some((lang) => resultLanguages?.includes(lang)) ??
      false;

    const matchesOpenAccess =
      options.openAccess?.includes(
        result.metadata.openaccess as JournalAccess
      ) ?? false;

    return matchesLanguage && matchesOpenAccess;
  });
};
