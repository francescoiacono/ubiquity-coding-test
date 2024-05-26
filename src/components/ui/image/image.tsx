import NextImage from 'next/image';
import { ComponentProps } from 'react';

interface ImageProps extends ComponentProps<typeof NextImage> {}

export const Image: React.FC<ImageProps> = ({ ...props }) => {
  return <NextImage {...props} />;
};
