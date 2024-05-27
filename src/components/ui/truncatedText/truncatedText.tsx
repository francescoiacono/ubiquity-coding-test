'use client';

import { useState } from 'react';
import styles from './truncatedText.module.css';

// TODO: sanitize div content with libraries

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

export const TruncatedText: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggles the read more state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // If the text is empty, return null
  if (!text) return null;

  // If the text is less than the max length, return the text
  if (text.length <= maxLength) {
    return (
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  // If the text is longer than the max length, truncate it
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
