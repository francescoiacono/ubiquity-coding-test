'use client';

import { Heading } from '@/components/ui/heading';
import { useResults } from '@/providers/resultsProvider/useResults';
import { JournalAccess } from '@/providers/resultsProvider/utils';
import { splitLanguages } from '@/utils/splitLanguages';
import { useMemo, useState } from 'react';
import styles from './resultsFilters.module.css';

interface Filters {
  languages: string[];
  openAccess: JournalAccess[];
}

interface ResultsContentState {
  filters: Filters;
}

export const ResultsFilters = () => {
  const { results, filterBy } = useResults();

  const initialResults = useMemo<Filters>(
    () => ({
      languages: Array.from(splitLanguages(results)),
      openAccess: ['hybrid', 'no', 'yes'],
    }),
    []
  );

  const [state, setState] = useState<ResultsContentState>({
    filters: { ...initialResults },
  });

  const handleCheckboxChange = (key: keyof Filters, value: string) => {
    const updatedValue = [...state.filters[key]];
    if (updatedValue.includes(value)) {
      updatedValue.splice(updatedValue.indexOf(value), 1);
    } else {
      updatedValue.push(value);
    }

    setState({
      ...state,
      filters: {
        ...state.filters,
        [key]: updatedValue,
      },
    });

    filterBy({ ...state.filters, [key]: updatedValue });
  };

  return (
    <section className={styles.container}>
      <fieldset className={styles.filter}>
        <legend>Languages</legend>
        {initialResults.languages.map((lang) => (
          <label key={lang}>
            <input
              onChange={() => handleCheckboxChange('languages', lang)}
              type='checkbox'
              checked={state.filters.languages.includes(lang)}
            />
            {lang}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.filter}>
        <legend>Journal Access</legend>
        <label>
          <input
            onChange={() => handleCheckboxChange('openAccess', 'yes')}
            type='checkbox'
            checked={state.filters.openAccess.includes('yes')}
          />
          Open Access
        </label>
        <label>
          <input
            onChange={() => handleCheckboxChange('openAccess', 'no')}
            type='checkbox'
            checked={state.filters.openAccess.includes('no')}
          />
          Closed Access
        </label>
        <label>
          <input
            onChange={() => handleCheckboxChange('openAccess', 'hybrid')}
            type='checkbox'
            checked={state.filters.openAccess.includes('hybrid')}
          />
          Hybrid Access
        </label>
      </fieldset>
    </section>
  );
};
