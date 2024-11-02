import * as React from 'react';

import { ConfigurationContext, ConfigurationContextValue } from '../contexts/configuration';
import AtlasConfig from '@atlas/design-system/utils/AtlasConfig';

export interface ConfigurationProviderProps {
  children: React.ReactNode;
  authLogo: string;
  menuLogo: string;
  atlasConfig: AtlasConfig | null;
  showReleaseNotification?: boolean;
  showTutorials?: boolean;
}

type LogoKeys = keyof ConfigurationContextValue['logos'];

const ConfigurationProvider = ({
  children,
  authLogo: defaultAuthLogo,
  menuLogo: defaultMenuLogo,
  atlasConfig,
  showReleaseNotification = false,
  showTutorials = false,
}: ConfigurationProviderProps) => {
  const [{ menuLogo, authLogo }, setLogos] = React.useState<{
    [_Key in `${LogoKeys}Logo`]?: ConfigurationContextValue['logos'][LogoKeys]['custom'];
  }>({
    menuLogo: null,
    authLogo: null,
  });

  const updateProjectSettings: ConfigurationContextValue['updateProjectSettings'] =
    React.useCallback(
      ({ menuLogo, authLogo }) => {
        setLogos({
          menuLogo: menuLogo || defaultMenuLogo,
          authLogo: authLogo || defaultAuthLogo,
        });
      },
      [defaultAuthLogo, defaultMenuLogo]
    );

  const configurationValue = React.useMemo(() => {
    return {
      logos: {
        menu: { custom: menuLogo, default: defaultMenuLogo },
        auth: { custom: authLogo, default: defaultAuthLogo },
      },
      updateProjectSettings,
      showReleaseNotification,
      showTutorials,
      atlasConfig,
    };
  }, [
    menuLogo,
    defaultMenuLogo,
    authLogo,
    defaultAuthLogo,
    updateProjectSettings,
    showReleaseNotification,
    showTutorials,
  ]);

  return (
    <ConfigurationContext.Provider value={configurationValue}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export { ConfigurationProvider };
