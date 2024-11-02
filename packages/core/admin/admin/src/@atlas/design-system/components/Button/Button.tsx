// Styles
import styled, { useTheme } from 'styled-components';
import styles from './button.module.scss';
import clsx from 'clsx';

// React
import { NavLink as RouterLink, LinkProps } from 'react-router-dom';
import React, { forwardRef } from 'react';

// Components
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';

// Utils
import { mapButtonPropsToMantine } from './utils';

// Types
import type { ButtonProps as StrapiButtonProps } from './StrapiButton';
import ConditionalWrapper from '@iliad/components/ConditionalWrapper';

export type ButtonProps = ComponentBaseProps & MantineButtonProps & {};
type _StrapiButtonProps = StrapiButtonProps & {
  variant:
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'danger-light'
    | 'ghost'
    | 'success'
    | 'success-light'
    | (string & {});
  icon: React.ReactNode;
  label: string;
  to: string;
};

const __Button = forwardRef(({ children, to, ...props }: Partial<_StrapiButtonProps> & {}, ref) => {
  let { className, component, size = 'sm', ...btn_props } = mapButtonPropsToMantine(props);

  console.log('ButtonProps:', {
    className,
    component,
    btn_props,
    children,
    props,
    size,
    to,
  });
  return (
    <ConditionalWrapper condition={to} wrapper={(c, _to) => <RouterLink to={_to}>{c}</RouterLink>}>
      <MantineButton
        className={clsx(styles.button, 'atlas-Button-sds', className)}
        data-loading={props.loading}
        {...btn_props}
        size={size}
        // @ts-ignore
        ref={ref}
        radius="xl"
      >
        {children}
      </MantineButton>
    </ConditionalWrapper>
  );
});

// This is nonsense, I hate styled components and this approach to coercion is... questionable.
const _Button = styled(__Button)<Partial<_StrapiButtonProps> & {}>``;

// We need to intercept the `as` prop and pass it to the Mantine Text component before styled-components has a chance to muck with it.
// We 100% want Mantine to handle polymorphism. (unless something breaks, I guess. I should probably include an escape hatch.)
const Button = forwardRef<HTMLDivElement, PolymorphEscapeHatch<_StrapiButtonProps>>(
  ({ as = 'button', icon, label, ...props }, ref) => (
    <_Button ref={ref} component={as} icon={icon} label={label} {...props} />
  )
) as typeof _Button;

const IconButton = forwardRef<HTMLDivElement, PolymorphEscapeHatch<_StrapiButtonProps>>(
  ({ as = 'button', icon, label, ...props }, ref) => (
    <_Button ref={ref} component={as} icon={icon} label={label} {...props} />
  )
) as typeof _Button;

export default Button;
// export { Button, IconButton };
export { Button };
