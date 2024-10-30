// Mantine - Components
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from '@mantine/core';

// Atlas
import mantineConfig from '@atlas/config/mantineConfig';

// Types
import Providers from './Providers';
import React from 'react';

type AtlasProvidersProps = Partial<React.ComponentProps<typeof Providers>> & {};

/**
 * AtlasProviders component wraps its children with MantineProvider and ModalsProvider.
 * Provides Atlas-specific context, to avoid changing Strapi's default Providers.
 *
 * @param {AtlasProvidersProps} props - The properties for the AtlasProviders component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the providers.
 * @param {Partial<React.ComponentProps<typeof Providers>>} props - The properties for the Strapi Providers component.
 *
 * @returns {JSX.Element} The wrapped children components.
 */
const AtlasProviders = ({ children }: AtlasProvidersProps) => {
  return (
    <MantineProvider {...mantineConfig}>
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
};

export default AtlasProviders;
export { AtlasProviders };
