import { normalizeStyles } from '@atlas/design-system';
import { Box } from '@atlas/design-system';

import styled from 'styled-components';

const LinkUserWrapper = normalizeStyles(
  'atlas-LinkUserWrapper-sds',
  styled(Box)`
    width: ${150 / 16}rem;
    position: absolute;
    bottom: ${({ theme }) => theme.spaces[9]};
    left: ${({ theme }) => theme.spaces[5]};
  `
);

export default LinkUserWrapper;
export { LinkUserWrapper };
