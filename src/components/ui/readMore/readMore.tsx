import { useState } from 'react';
import styles from './readMore.module.css';

// TODO: sanitize div content with libraries

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

export const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (!text) return null;

  if (text.length <= maxLength) {
    return (
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  const truncatedText = text.slice(0, maxLength) + '...';

  return (
    <div className={styles.container}>
      <div
        dangerouslySetInnerHTML={{ __html: isExpanded ? text : truncatedText }}
      />
      <button className={styles.readMoreButton} onClick={toggleReadMore}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};
