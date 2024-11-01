// Styles
import styles from './text-overflow-container.module.scss';
import clsx from 'clsx';

// Mantine
import { BoxComponentProps, Box } from '@mantine/core';

type TextOverflowContainerProps = ComponentBaseProps & BoxComponentProps & {};
const TextOverflowContainer = ({ children, className, ...props }: TextOverflowContainerProps) => {
  return (
    <Box
      className={clsx(styles.textOverflowContainer, 'atlas-TextOverflowContainer-ii', className)}
      {...props}
    >
      <div className={styles.textOverflow}>{children}</div>
    </Box>
  );
};

export default TextOverflowContainer;
export { TextOverflowContainer };
