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
import type { PolymorphEscapeHatch } from '@atlas/design-system/types/ads';
export type TypographyProps = Partial<ComponentBaseProps & StrapiTypographyProps & {}>;

// This is a wrapper around the Mantine Text component. It attempts to coerce
// Strapi Typography props into commensurate Mantine Text props.
const __Typography = forwardRef(({ children, ...props }: TypographyProps, ref) => {
  const theme = useTheme();
  // console.log({ children, theme, props });
  let { className, ...text_props } = mapTypographyPropsToMantine(props, theme);
  // console.log({ className, text_props });
  return (
    <Text ref={ref} className={clsx('atlas-Typography-sds', className)} {...text_props}>
      {children}
    </Text>
  );
});

// This is nonsense, I hate styled components and this approach to coercion is... questionable.
const _Typography = styled(__Typography)<TypographyProps>``;
// We need to intercept the `as` prop and pass it to the Mantine Text component before styled-components has a chance to muck with it.
// We 100% want Mantine to handle polymorphism. (unless something breaks, I guess. I should probably include an escape hatch.)
const Typography = forwardRef<HTMLDivElement, React.ComponentProps<typeof _Typography>>(
  ({ as = 'p', ...props }: PolymorphEscapeHatch<TypographyProps & TextProps>, ref) => (
    <_Typography ref={ref} component={as} {...props} />
  )
) as typeof _Typography;

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

const M_Typography = (props: TypographyProps & TextProps) => {
  return <Typography {...props} />;
};

export default Typography;
export { Typography, M_Typography, Text };
