type Client = {
  organizationWebsite: string;
  organizationTitle: string;
  organizationLogo?: string;
};

type SideMenuConfig = {
  floatingBottom: string[];
  floatingTop: string[];
  plugins: string[];
  mySite: string[];
};

export type AtlasConfigData = {
  dashboard: {
    version: string;
    title: string;
  };
  client: Client;
  iliad: Client & {
    supportEmail: string;
  };
  sideMenu: SideMenuConfig;
};

class AtlasConfig implements AtlasConfigData {
  dashboard!: {
    version: string;
    title: string;
  };
  client!: Client;
  iliad!: Client & {
    supportEmail: string;
  };
  sideMenu!: SideMenuConfig;

  constructor(data: AtlasConfigData) {
    Object.assign(this, data);
  }

  get(key: keyof AtlasConfigData): any {
    return this[key];
  }

  static default(): AtlasConfig {
    return new AtlasConfig({
      dashboard: {
        version: '0.0.0',
        title: 'Atlas',
      },
      client: {
        organizationWebsite: 'https://example.com',
        organizationTitle: 'Example',
      },
      iliad: {
        organizationWebsite: 'https://example.com',
        organizationTitle: 'Example',
        supportEmail: '',
      },
      sideMenu: {
        floatingBottom: [],
        floatingTop: [],
        plugins: [],
        mySite: [],
      },
    });
  }

  private static validate(data: AtlasConfigData): void {}
}

export default AtlasConfig;
export { AtlasConfig };
