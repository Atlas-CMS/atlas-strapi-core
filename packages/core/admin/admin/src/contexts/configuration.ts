import AtlasConfig from '@atlas/AtlasConfig';
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
    throw new Error('updateProjectSettings was not implemented');
  },
});

export { ConfigurationContext };
