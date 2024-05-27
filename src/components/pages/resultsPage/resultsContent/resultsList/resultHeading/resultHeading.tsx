import { Heading } from '@/components/ui/heading';
import { SubmissionResponse } from '@/types/SubmissionResponse';
import { decimalToPercentage } from '@/utils/decimalToPercentage';
import styles from './resultHeading.module.css';
import Link from 'next/link';

interface ResultHeadingProps {
  paper: SubmissionResponse;
}

export const ResultHeading: React.FC<ResultHeadingProps> = ({ paper }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.score}>
          {decimalToPercentage(paper.score)}% Match
        </p>
        <Heading className={styles.heading} level={2}>
          {paper.metadata.title}
        </Heading>
      </div>
      {paper.metadata.homepage_link && (
        <Link className={styles.visitLink} href={paper.metadata.homepage_link}>
          Visit Page
        </Link>
      )}
    </div>
  );
};
