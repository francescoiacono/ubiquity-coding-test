import { Heading } from '@/components/ui/heading';
import { SubmissionResponse } from '@/types/SubmissionResponse';
import styles from './resultHeading.module.css';
import Link from 'next/link';

interface ResultHeadingProps {
  paper: SubmissionResponse;
}

export const ResultHeading: React.FC<ResultHeadingProps> = ({ paper }) => {
  /**
   * Formats the score by multiplying it by 100 and fixing it to 2 decimal places.
   *
   * @param score - The score to be formatted.
   * @returns The formatted score as a string.
   */
  const formatScore = (score: number) => {
    return (score * 100).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.score}>{formatScore(paper.score)}% Match</p>
        <Heading level={3}>{paper.metadata.title}</Heading>
      </div>
      {paper.metadata.homepage_link && (
        <Link className={styles.visitLink} href={paper.metadata.homepage_link}>
          Visit Page
        </Link>
      )}
    </div>
  );
};
