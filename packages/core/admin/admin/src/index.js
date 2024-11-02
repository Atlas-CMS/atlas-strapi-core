// Data / Config
import { Components, Fields, Middlewares, Reducers } from './core/apis';
import appCustomisations from './app';
import appReducers from './reducers';
import plugins from './plugins';

// Utils
import { getFetchClient } from '@strapi/helper-plugin';
import { createRoot } from 'react-dom/client';

// Atlas
import AtlasConfig, { AtlasConfigData } from '@atlas/design-system/utils/AtlasConfig';
import { initializeElectron } from '@utils/electron';

window.strapi = {
  /**
   * This ENV variable is passed from the strapi instance, by default no url is set
   * in the config and therefore the instance returns you an empty string so URLs are relative.
   *
   * To ensure that the backendURL is always set, we use the window.location.origin as a fallback.
   */
  backendURL: process.env.STRAPI_ADMIN_BACKEND_URL || window.location.origin,
  isEE: false,
  telemetryDisabled: process.env.STRAPI_TELEMETRY_DISABLED ?? false,
  // @ts-ignore
  features: {
    REVIEW_WORKFLOWS: 'review-workflows',
    AUDIT_LOGS: 'audit-logs',
    SSO: 'sso',
  },
  projectType: 'Community',
  flags: {
    nps: false,
  },
};

const customConfig = appCustomisations;

const reducers = Reducers({ appReducers });
const middlewares = Middlewares();
const library = {
  components: Components(),
  fields: Fields(),
};

const MOUNT_NODE = document.getElementById('app');

const run = async () => {
  const { get } = getFetchClient();
  let atlasConfig;

  try {
    const { data: atlasConfigData } = await get('/admin/atlas-config');
    atlasConfig = new AtlasConfig(atlasConfigData);
    console.log('atlasConfig', atlasConfig);
  } catch (err) {
    console.error(err);
    return;
  }

  try {
    const {
      data: {
        data: { isEE, features, flags },
      },
    } = await get('/admin/project-type');

    window.strapi.isEE = isEE;
    window.strapi.flags = flags;
    window.strapi.features = {
      ...window.strapi.features,
      isEnabled: (featureName) => features.some((feature) => feature.name === featureName),
    };
    window.strapi.projectType = isEE ? 'Enterprise' : 'Community';
  } catch (err) {
    console.error(err);
  }

  // We need to make sure to fetch the project type before importing the StrapiApp
  // otherwise the strapi-babel-plugin does not work correctly
  // @ts-ignore
  const StrapiApp = await import(/* webpackChunkName: "admin-app" */ './StrapiApp');

  const app = StrapiApp.default({
    adminConfig: customConfig,
    atlasConfig: atlasConfig,
    appPlugins: plugins,
    middlewares,
    reducers,
    library,
  });

  await app.bootstrapAdmin();
  await app.initialize();
  await app.bootstrap();
  await app.loadTrads();

  if (!MOUNT_NODE) return;
  initializeElectron();

  const root = createRoot(MOUNT_NODE);
  root.render(app.render());
};

run();
