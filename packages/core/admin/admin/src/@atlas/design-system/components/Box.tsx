// Styles
import clsx from 'clsx';

// Components
import { Box as StrapiBox } from '@strapi/design-system';
import { BoxComponentProps, Box as MantineBox } from '@mantine/core';
type BoxProps = ComponentBaseProps & BoxComponentProps;
const Box = ({ children, ...props }: BoxProps) => {
  return (
    <MantineBox component={StrapiBox} {...props}>
      {children}
    </MantineBox>
  );
};

export default Box;
export { Box };
