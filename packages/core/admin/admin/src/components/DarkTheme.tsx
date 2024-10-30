import * as React from 'react';

// Styles
import { createGlobalStyle } from 'styled-components';

// Components
import { DesignSystemProvider } from '@atlas/design-system';

// Utils
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useIntl } from 'react-intl';

// Types
interface ThemeProps {
  children: React.ReactNode;
}

// Styled Components
const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.neutral100};
  }
`;

const DarkTheme = ({ children }: ThemeProps) => {
  const { themes } = useThemeToggle();
  const { locale } = useIntl();
  const currentTheme = 'light';

  return (
    <DesignSystemProvider
      // Enforce dark theem
      theme={currentTheme && themes ? themes['dark'] : themes?.dark}
      locale={locale}
    >
      {children}
      <GlobalStyle />
    </DesignSystemProvider>
  );
};

export default DarkTheme;
export { DarkTheme };
