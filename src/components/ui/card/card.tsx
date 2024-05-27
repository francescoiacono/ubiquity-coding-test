import styles from './card.module.css';

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
