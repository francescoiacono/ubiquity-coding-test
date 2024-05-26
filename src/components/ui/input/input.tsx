import { Label } from '../label';
import styles from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  //TODO: Add error message prop
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <Label htmlFor={id}>{label}</Label>
      <input className={styles.input} id={id} {...props} />
    </div>
  );
};
