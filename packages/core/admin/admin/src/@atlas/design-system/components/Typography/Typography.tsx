import styled, { useTheme } from 'styled-components';
import { forwardRef } from 'react';

// Styles
import styles from './typography.module.scss';
import clsx from 'clsx';

// Components
import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';

// Utils
import { mapTypographyPropsToMantine } from './utils/functions';
import { withTheme } from '@atlas/design-system/utils';

// Types
import type { TypographyProps as StrapiTypographyProps } from '@atlas/design-system/components/_Typography';
export type TypographyProps = Partial<ComponentBaseProps & StrapiTypographyProps & {}>;

// This is a wrapper around the Mantine Text component. It attempts to coerce
// Strapi Typography props into commensurate Mantine Text props.
const _Typography = forwardRef(({ children, ...props }: TypographyProps, ref) => {
  const theme = useTheme();
  console.log({ children, theme, props });
  let { className, ...text_props } = mapTypographyPropsToMantine(props, theme);
  console.log({ className, text_props });
  return (
    <Text ref={ref} className={clsx('atlas-Typography-sds', className)} {...text_props}>
      {children}
    </Text>
  );
});

const Typography = styled(_Typography)<TypographyProps>``;

export type TextProps = ComponentBaseProps &
  MantineTextProps & {
    component?: any;
  };

const Text = forwardRef(({ children, className, ...props }: TextProps, ref) => {
  return (
    <MantineText ref={ref} className={clsx(styles.typography, className)} {...props}>
      {children}
    </MantineText>
  );
});

export default Typography;
export { Typography, Text };
