// @ts-ignore
import iliad_atlas_logo from './extensions/iliad_atlas.png';

export default {
  config: {
    auth: {
      logo: iliad_atlas_logo,
    },
    menu: {
      logo: iliad_atlas_logo,
    },
    head: {
      favicon: iliad_atlas_logo,
    },
    locales: [],
  },
  bootstrap(app) {
    console.log(app);
  },
};
