import { useTheme } from 'styled-components';
import React from 'react';

type WithTheme<P> = P & { theme: import('styled-components').DefaultTheme };
// With theme higher order component
export const withTheme =
  <P extends object>(Component: React.ComponentType<WithTheme<P>>) =>
  (props: P) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
