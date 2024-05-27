import { SubmissionResponse } from '@/types/SubmissionResponse';
import { Card } from '@/components/ui/card';
import { ReadMore } from '@/components/ui/readMore';
import { ResultTags } from './resultTags';
import { ResultHeading } from './resultHeading/resultHeading';
import styles from './resultsTable.module.css';

interface ResultsTableProps {
  data: SubmissionResponse[];
}

/**
 * Renders a table of results based on the provided data.
 */
export const ResultTable: React.FC<ResultsTableProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((paper) => (
        <Card key={paper.id}>
          <ResultHeading paper={paper} />
          <ResultTags paper={paper} />
          <ReadMore
            text={paper.metadata.description_from_publisher}
            maxLength={200}
          />
        </Card>
      ))}
    </div>
  );
};
