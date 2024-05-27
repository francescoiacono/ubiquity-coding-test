import styles from './tag.module.css';

interface TagProps {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  return <div className={styles.tag}>{children}</div>;
};
