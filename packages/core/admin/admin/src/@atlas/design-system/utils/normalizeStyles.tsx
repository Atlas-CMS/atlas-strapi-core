import styled, { StyledComponent } from 'styled-components';
import clsx from 'clsx';

function normalizeStyles(
  className: string,
  styledComponent: StyledComponent<any, any, any, any>
): StyledComponent<any, any, any, any> {
  return styled(styledComponent).attrs((props: any) => ({
    className: clsx(className, props.className),
  }))``;
}

export default normalizeStyles;
export { normalizeStyles };
