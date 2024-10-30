// Styles
import clsx from 'clsx';

// Components
import { Box as StrapiBox } from '@strapi/design-system';
import { BoxComponentProps, Box as MantineBox } from '@mantine/core';
type BoxProps = ComponentBaseProps & BoxComponentProps;

const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <MantineBox className={clsx('atlas-Box-sds', className)} component={StrapiBox} {...props}>
      {children}
    </MantineBox>
  );
};

export default Box;
export { Box };
