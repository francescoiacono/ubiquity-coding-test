import { CircularLoading } from '../circularLoading';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <button className={styles.button} disabled={loading} {...props}>
      {loading ? <CircularLoading className={styles.whiteLoading} /> : children}
    </button>
  );
};
