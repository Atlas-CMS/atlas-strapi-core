// Styles
import styles from './typography.module.scss';
import clsx from 'clsx';

// Components
import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';
import {
  TypographyProps as StrapiTypographyProps,
  Typography as StrapiTypography,
} from '@strapi/design-system';

// Utils
import { mapTypographyPropsToMantine } from './utils/functions';

export type TypographyProps = ComponentBaseProps & StrapiTypographyProps & {};

// This is a wrapper around the Mantine Text component. It attempts to coerce
// Strapi Typography props into commensurate Mantine Text props.
const Typography = ({ children, ...props }: TypographyProps) => {
  let text_props = mapTypographyPropsToMantine(props);

  return <StrapiTypography {...props}>{children}</StrapiTypography>;
};

export type TextProps = ComponentBaseProps &
  MantineTextProps & {
    component?: any;
  };

const Text = ({ children, ...props }: TextProps) => {
  return <MantineText {...props}>{children}</MantineText>;
};

export default Typography;
export { Typography, Text };
