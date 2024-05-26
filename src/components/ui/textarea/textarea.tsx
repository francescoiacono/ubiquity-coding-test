import { Label } from '../label';
import styles from './textarea.module.css';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.textareaContainer}>
      <Label htmlFor={id}>{label}</Label>
      <textarea id={id} className={styles.textarea} {...props} />
    </div>
  );
};
