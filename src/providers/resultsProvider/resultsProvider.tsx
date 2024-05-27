'use client';

import { SubmissionResponse } from '@/types/SubmissionResponse';
import { createContext, useState } from 'react';
import { SortOptions, sort } from './utils';

interface ResultsProviderProps {
  results: SubmissionResponse[];
  children: React.ReactNode;
}

interface ResultsContextProps {
  results: SubmissionResponse[];
  sortBy: (options: SortOptions) => void;
}

/**
 * Context for managing results state.
 * This context provides the results state and related functions to its descendants.
 */
export const ResultsContext = createContext<ResultsContextProps | null>(null);

export const ResultsProvider: React.FC<ResultsProviderProps> = ({
  results,
  children,
}) => {
  const [state, setState] = useState<SubmissionResponse[]>(results);

  /**
   * Sorts the results based on the provided options.
   * @param options - The sorting options.
   */
  const sortBy = (options: SortOptions) => {
    const sortedResults = sort(results, options);
    setState(sortedResults);
  };

  return (
    <ResultsContext.Provider value={{ results: state, sortBy }}>
      {children}
    </ResultsContext.Provider>
  );
};
