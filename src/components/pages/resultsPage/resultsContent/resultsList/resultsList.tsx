'use client';

import { Card } from '@/components/ui/card';
import { ResultTags } from './resultTags';
import { ResultHeading } from './resultHeading/resultHeading';
import { useResults } from '@/providers/resultsProvider/useResults';
import styles from './resultsList.module.css';
import { TruncatedText } from '@/components/ui/truncatedText';

/**
 * Renders a table of results based on the provided data.
 */
export const ResultsList: React.FC = () => {
  const { results } = useResults();

  return (
    <ul aria-label='results' className={styles.container}>
      {results.map((paper) => (
        <li key={paper.id}>
          <Card>
            <ResultHeading paper={paper} />
            <ResultTags paper={paper} />
            <TruncatedText
              text={paper.metadata.description_from_publisher}
              maxLength={200}
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};
