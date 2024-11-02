import { useContext } from 'react';

import { ConfigurationContext } from '@contexts/configuration';
import AtlasConfig from '@atlas/design-system/utils/AtlasConfig';

export function useAtlasConfig(): AtlasConfig {
  return useContext(ConfigurationContext).atlasConfig ?? AtlasConfig.default();
}
