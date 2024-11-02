import AtlasConfig from '@atlas/design-system/utils/AtlasConfig';
import { createContext } from 'react';

export interface ConfigurationContextValue {
  logos: {
    auth: { custom?: string | null; default: string };
    menu: { custom?: string | null; default: string };
  };
  atlasConfig: AtlasConfig | null;
  showTutorials: boolean;
  showReleaseNotification: boolean;
  updateProjectSettings: (settings: { authLogo?: string; menuLogo?: string }) => void;
}

const ConfigurationContext = createContext<ConfigurationContextValue>({
  logos: {
    auth: { default: '' },
    menu: { default: '' },
  },
  atlasConfig: null,
  showTutorials: false,
  showReleaseNotification: false,
  updateProjectSettings: () => {
    console.warn('updateProjectSettings not implemented');
  },
});

export { ConfigurationContext };
