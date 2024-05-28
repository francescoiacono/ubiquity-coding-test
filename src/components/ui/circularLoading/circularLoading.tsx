'use client';

import CircularProgress from '@mui/material/CircularProgress';
import styles from './circularLoading.module.css';

interface CircularLoadingProps {
  className?: string;
}

export const CircularLoading: React.FC<CircularLoadingProps> = ({
  className,
}) => {
  return (
    <CircularProgress
      color='inherit'
      className={`${className} ${styles.loading}`}
    />
  );
};
