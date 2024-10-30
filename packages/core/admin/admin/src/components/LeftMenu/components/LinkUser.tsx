import { NavLink as RouterNavLink } from 'react-router-dom';
import { normalizeStyles } from '@atlas/design-system';
import styled from 'styled-components';

const LinkUser = normalizeStyles(
  'atlas-LinkUser-sds',
  styled(RouterNavLink)<{ logout?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
    border-radius: ${({ theme }) => theme.spaces[1]};

    &:hover {
      background: ${({ theme, logout }) =>
        logout ? theme.colors.danger100 : theme.colors.primary100};
      text-decoration: none;
    }

    svg {
      path {
        fill: ${({ theme }) => theme.colors.danger600};
      }
    }
  `
);

export default LinkUser;
export { LinkUser };
