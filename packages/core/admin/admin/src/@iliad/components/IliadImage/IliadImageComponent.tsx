'use server';

// Styles
import styles from './iliad-image.module.scss';
import clsx from 'clsx';

// Components
import { Image } from '@mantine/core';
import NextImage from 'next/image';

// Types
import type { IliadImageProps } from './index';

function IliadImageComponent({ className, ...props }: IliadImageProps) {
  return (
    <Image
      component={NextImage}
      className={clsx(className, styles.mainContainer)}
      {...props}
    />
  );
}

export default IliadImageComponent;
export { IliadImageComponent };
