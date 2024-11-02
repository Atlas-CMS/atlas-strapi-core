import { useEffect } from 'react';

// Styles
import styles from './left-menu.module.scss';
import styled from 'styled-components';
import clsx from 'clsx';

// Components
import { MainNav, NavFooter, NavSections, NavCondense } from '@atlas/design-system/v2';
import { CastAtlasNavSection, AtlasNavBrand, UserMenu } from './components';
import DarkTheme from '@components/DarkTheme';

// Icons
import { Exit, Write, House, User } from '@strapi/icons';
import { Atlas } from '@atlas/design-system/icons';

// Utils
import { useWindowEvent, useDebouncedCallback } from '@mantine/hooks';
import { sortMenuItems } from './utils/functions';
import { useHistory } from 'react-router-dom';

import { auth, getFetchClient, usePersistentState } from '@strapi/helper-plugin';
import { useConfiguration } from '@hooks/useConfiguration';
import { useAtlasConfig } from '@hooks/useAtlasConfig';
import { Menu } from '@hooks/useMenu';

const AtlasNavSections = styled(NavSections).attrs({ className: 'atlas-NavSections-sds' })`
  height: 100%;
  gap: 1rem;
`;

interface LeftMenuProps extends Pick<Menu, 'generalSectionLinks' | 'pluginsSectionLinks'> {}

const LeftMenu = ({ generalSectionLinks, pluginsSectionLinks }: LeftMenuProps) => {
  // Initial State
  const { dashboard, client, sideMenu } = useAtlasConfig();

  const { logos } = useConfiguration();
  const history = useHistory();

  // Utilities
  const { post } = getFetchClient();

  // Internal State
  const [condensed, setCondensed] = usePersistentState('navbar-condensed', false);

  // Derived State
  const allLinks = [
    {
      to: '/',
      icon: House,
      intlLabel: {
        defaultMessage: 'Home',
        id: 'atlas.home',
      },
      // @ts-ignore
      isActive: (match, location) => {
        if (!match) return false;
        return location.pathname === '/'; // may need to check for /admin/
      },
    },
    {
      to: '/content-manager',
      icon: Write,
      intlLabel: {
        id: 'global.content-manager',
        defaultMessage: 'Content manager',
      },
    },
    ...generalSectionLinks,
    ...pluginsSectionLinks,
  ];
  const { floatingTop, mySite, plugins, floatingBottom, remainder } = sortMenuItems(
    allLinks,
    sideMenu
  );

  const userMenuLinks: Array<
    Optional<MainMenuItem, 'permissions'> & { onClick?: () => Promise<void> }
  > = [
    {
      to: '/me',
      intlLabel: {
        id: 'global.profile',
        defaultMessage: 'Profile',
      },
      icon: User,
    },
    {
      to: null,
      intlLabel: {
        id: 'atlas.electron.multiInstance.changeInstance',
        defaultMessage: 'Switch Organization',
      },
      icon: Atlas,
      onClick: async () => {},
    },
    {
      to: '/auth/login',
      intlLabel: {
        id: 'app.components.LeftMenu.logout',
        defaultMessage: 'Logout',
      },
      onClick: handleLogout,
      icon: Exit,
    },
  ];

  const handleEscapeKey = useDebouncedCallback((event) => {
    if (event.code === 'Escape') {
      event.preventDefault();
      setCondensed((s) => !s);
    }
  }, 40);

  // Listen for escape key press to toggle condensed state
  useWindowEvent('keydown', handleEscapeKey);

  async function handleLogout() {
    await post('/admin/logout');
    auth.clearAppStorage();
    // handleToggleUserLinks();
    history.push('/auth/login');
  }

  return (
    <DarkTheme>
      <MainNav
        className={clsx(styles.mainNav, 'atlas-MainNav-sds')}
        data-condensed={condensed}
        condensed={condensed}
      >
        <AtlasNavBrand
          workplace={client.organizationTitle}
          icon={logos.menu.default}
          title={dashboard.title}
          condensed={condensed}
        />

        <AtlasNavSections>
          {/* These links float at the top, without a title */}
          <CastAtlasNavSection navLinks={[...floatingTop]} />
          {/* <CastAtlasNavSection label="My Site" navLinks={mySite} /> */}
          {/* <CastAtlasNavSection label="Plugins" navLinks={plugins} /> */}
          <CastAtlasNavSection label="Unsorted" navLinks={remainder} />

          <div className={styles.navFooter}>
            <CastAtlasNavSection className={styles.bottom} navLinks={floatingBottom} />
          </div>
        </AtlasNavSections>

        <NavFooter>
          <UserMenu nestedLinks={userMenuLinks} />
          <NavCondense onClick={() => setCondensed((s) => !s)} />
        </NavFooter>
      </MainNav>
    </DarkTheme>
  );
};

export default LeftMenu;
export { LeftMenu };
