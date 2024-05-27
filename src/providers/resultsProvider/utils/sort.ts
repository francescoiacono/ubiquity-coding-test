import { SubmissionResponse } from '@/types/SubmissionResponse';

type SortCriterion = 'score' | 'title';
type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  criterion: SortCriterion;
  order: SortOrder;
}

/**
 * Sorts the results array based on the given criterion and order.
 *
 * @param results - The results array to be sorted.
 * @param criterion - The criterion to sort by.
 * @param order - The order to sort in.
 * @returns The sorted results array.
 */
export const sort = (
  results: SubmissionResponse[],
  { criterion, order = 'asc' }: SortOptions
): SubmissionResponse[] => {
  // Create a copy of the original array
  const sortedResults = [...results];

  // Sort the array based on the given criterion and order
  sortedResults.sort((a, b) => {
    let comparison = 0;
    if (criterion === 'score') {
      comparison = a.score - b.score;
    } else if (criterion === 'title') {
      comparison = a.metadata.title.localeCompare(b.metadata.title);
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sortedResults;
};
