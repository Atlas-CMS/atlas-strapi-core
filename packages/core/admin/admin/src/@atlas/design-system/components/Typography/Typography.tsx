import { useTheme } from 'styled-components';
// Styles
import styles from './typography.module.scss';
import clsx from 'clsx';

// Components
import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';

// Utils
import { mapTypographyPropsToMantine } from './utils/functions';
import { withTheme } from '@atlas/design-system/utils';

// Types
import type { TypographyProps as StrapiTypographyProps } from '@strapi/design-system';
export type TypographyProps = ComponentBaseProps & StrapiTypographyProps & {};

// This is a wrapper around the Mantine Text component. It attempts to coerce
// Strapi Typography props into commensurate Mantine Text props.
const Typography = withTheme<TypographyProps>(({ children, theme, ...props }) => {
  let { className, ...text_props } = mapTypographyPropsToMantine(props, theme);

  return (
    <Text className={clsx('atlas-Typography-sds', className)} {...text_props}>
      {children}
    </Text>
  );
});

export type TextProps = ComponentBaseProps &
  MantineTextProps & {
    component?: any;
  };

const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <MantineText className={clsx(styles.typography, className)} {...props}>
      {children}
    </MantineText>
  );
};

export default Typography;
export { Typography, Text };
