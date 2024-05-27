import { Tag } from '@/components/ui/tag';
import { SubmissionResponse } from '@/types/SubmissionResponse';
import styles from './resultTags.module.css';

interface ResultTagsProps {
  paper: SubmissionResponse;
}

/**
 * Separates a given language string into an array of individual languages.
 * If the language string contains a semicolon (;),
 * it splits the string at the semicolon and returns an array of languages.
 * If the language string does not contain a semicolon,
 * it returns an array with the original language string as the only element.
 *
 * @param language - The language string to be separated.
 * @returns An array of individual languages.
 */
const separateLanguages = (language: string) => {
  if (!language) return [];
  if (language.includes(';')) return language.split(';');
  return [language];
};

export const ResultTags: React.FC<ResultTagsProps> = ({ paper }) => {
  const languages = separateLanguages(paper.metadata.language);

  return (
    <ul aria-label='tags' className={styles.container}>
      {languages.map((language) => (
        <li key={language}>
          <Tag>{language}</Tag>
        </li>
      ))}
      {paper.metadata.openaccess && (
        <li>
          <Tag>
            {paper.metadata.openaccess === 'yes' && 'Open Access'}
            {paper.metadata.openaccess === 'no' && 'Restricted Access'}
            {paper.metadata.openaccess === 'hybrid' && 'Hybrid'}
          </Tag>
        </li>
      )}
    </ul>
  );
};
