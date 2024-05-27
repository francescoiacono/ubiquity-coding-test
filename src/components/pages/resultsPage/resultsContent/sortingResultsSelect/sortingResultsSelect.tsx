import { useResults } from '@/providers/resultsProvider/useResults';
import { SortOptions } from '@/providers/resultsProvider/utils';
import styles from './sortingResultsSelect.module.css';

/**
 * Mapping of sort options to sort configurations.
 */
const sortOptionsMapping: Record<string, SortOptions> = {
  'name-asc': { criterion: 'title', order: 'asc' },
  'name-desc': { criterion: 'title', order: 'desc' },
  'score-highest': { criterion: 'score', order: 'desc' },
  'score-lowest': { criterion: 'score', order: 'asc' },
};

export const SortingResultsSelect: React.FC = () => {
  const { sortBy } = useResults();

  /**
   * Event handler for when the select value changes.
   * It sorts the results based on the selected option.
   * @param e - The change event
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    const sortConfig = sortOptionsMapping[sortOption];

    if (sortConfig) {
      sortBy(sortConfig);
    }
  };

  return (
    <select className={styles.select} onChange={handleSortChange}>
      <option value='score-highest'>Highest Score</option>
      <option value='score-lowest'>Lowest Score</option>
      <option value='name-asc'>Name (A-Z)</option>
      <option value='name-desc'>Name (Z-A)</option>
    </select>
  );
};
