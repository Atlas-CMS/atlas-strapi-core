import { StrapiAppContextValue } from '@strapi/helper-plugin';
import AtlasConfig from '@atlas/AtlasConfig';
type IntlLabel = StrapiAppContextValue['menu'][number]['intlLabel'];
type MenuItem = StrapiAppContextValue['menu'][number];

// Some goofballs accidentally passed their entire package.json file as a prop so now we have to deal with it
type RetardedMenuItem = MenuItem & {
  intlLabel: IntlLabel & {
    id: { name: string };
  };
};

type SortedMenuItems = {
  floatingBottom: Array<MenuItem>;
  floatingTop: Array<MenuItem>;
  plugins: Array<MenuItem>;
  mySite: Array<MenuItem>;
  // Rest of the items. Useful for testing.
  remainder: Array<MenuItem>;
};

type SideMenuConfig = AtlasConfig['sideMenu'];

function isRetardedMenuItem(item: MenuItem | RetardedMenuItem): item is RetardedMenuItem {
  try {
    // @ts-ignore
    return 'id' in item.intlLabel.id;
  } catch (e) {
    return false;
  }
}

export function getId(item: MenuItem | RetardedMenuItem): string {
  if (isRetardedMenuItem(item)) {
    return item.intlLabel.id.name;
  }
  return item.intlLabel.id as string;
}

export function getIntl(item: MenuItem | RetardedMenuItem): IntlLabel {
  if (isRetardedMenuItem(item)) {
    // @ts-ignore
    return item.intlLabel.id;
  }

  return item.intlLabel;
}
type _MenuItem = Optional<MenuItem, 'permissions' | 'Component' | 'notificationsCount'>;

export default function sortMenuItems(
  items: Array<MenuItem | _MenuItem>,
  sideMenuConfig: SideMenuConfig
): SortedMenuItems {
  const sorted: SortedMenuItems = {
    floatingBottom: [],
    floatingTop: [],
    plugins: [],
    mySite: [],
    // All the rest. Useful for testing.
    remainder: [],
  };

  for (const _item of items) {
    const item = _item as MenuItem;
    const id = getId(item);

    if (sideMenuConfig.floatingBottom.includes(id)) {
      sorted.floatingBottom.push(item);
    } else if (sideMenuConfig.floatingTop.includes(id)) {
      sorted.floatingTop.push(item);
    } else if (sideMenuConfig.plugins.includes(id)) {
      sorted.plugins.push(item);
    } else if (sideMenuConfig.mySite.includes(id)) {
      sorted.mySite.push(item);
    } else {
      sorted.remainder.push(item);
    }
  }

  return sorted;
}

export { sortMenuItems };
