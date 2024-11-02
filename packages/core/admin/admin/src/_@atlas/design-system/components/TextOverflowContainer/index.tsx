// Styles
import styles from './text-overflow-container.module.scss';
import clsx from 'clsx';

// Mantine
import { BoxComponentProps, Box } from '@mantine/core';

type TextOverflowContainerProps = ComponentBaseProps &
  BoxComponentProps & {
    defaultHiddenStyles?: boolean;
    hidden?: boolean; // Option prop to apply additional styles, if the parent component knows when the text will be overflowed.
  };

const TextOverflowContainer = ({
  defaultHiddenStyles = true,
  hidden = false,
  // Base props
  className,
  children,
  ...props
}: TextOverflowContainerProps) => {
  const _classNames = [styles.textOverflowContainer, 'atlas-TextOverflowContainer-ii', className];

  if (defaultHiddenStyles) {
    _classNames.push(styles.defaultHidden);
  }

  return (
    <Box className={clsx(..._classNames)} data-hidden={hidden} {...props}>
      <div className={styles.textOverflow}>{children}</div>
    </Box>
  );
};

export default TextOverflowContainer;
export { TextOverflowContainer };
