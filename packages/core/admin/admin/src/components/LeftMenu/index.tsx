import * as React from 'react';

// Styles
import styles from './left-menu.module.scss';
import styled from 'styled-components';
import clsx from 'clsx';

// Components
import { Box, Divider, Flex, FocusTrap } from '@atlas/design-system';
import { Typography } from '@atlas/design-system';
import { LinkUserWrapper, LinkUser } from './components';
import { AtlasNavSection, CastAtlasNavSection } from './components/AtlasNavSection';
import { AtlasNavBrand } from './components/AtlasNavBrand';

import {
  MainNav,
  NavLink,
  NavUser,
  NavBrand,
  NavFooter,
  NavSection,
  NavSections,
  NavCondense,
} from '@atlas/design-system/v2';
import DarkTheme from '@components/DarkTheme';

// Icons
import { Plausible } from '@atlas/design-system/icons';
import { Exit, Write, House } from '@strapi/icons';

// Utils
import { NavLink as RouterNavLink, useHistory, useLocation } from 'react-router-dom';
import { initialsFromName } from '@utils/initialsFromName';
import { sortMenuItems } from './utils/functions';
import { useIntl } from 'react-intl';

import {
  auth,
  useAppInfo,
  useTracking,
  getFetchClient,
  usePersistentState,
} from '@strapi/helper-plugin';
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
  const { userDisplayName } = useAppInfo();
  const { logos } = useConfiguration();
  const { pathname } = useLocation();
  const history = useHistory();

  // Utilities
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { post } = getFetchClient();

  // Refs
  const navUserRef = React.useRef<HTMLDivElement>(null!);

  // Internal State
  const [condensed, setCondensed] = usePersistentState('navbar-condensed', false);
  const [userLinksVisible, setUserLinksVisible] = React.useState(false);

  // Derived State
  const initials = initialsFromName(userDisplayName);
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

  React.useEffect(() => {
    console.log({ floatingTop, mySite, plugins, floatingBottom }, allLinks, sideMenu);
  }, [floatingTop, mySite, plugins, floatingBottom, allLinks, sideMenu]);

  // Event Handlers
  const handleToggleUserLinks = () => setUserLinksVisible((prev) => !prev);

  const handleLogout = async () => {
    await post('/admin/logout');
    auth.clearAppStorage();
    handleToggleUserLinks();
    history.push('/auth/login');
  };

  const handleBlur: React.FocusEventHandler = (e: any) => {
    if (
      !e.currentTarget.contains(e.relatedTarget) &&
      e.relatedTarget?.parentElement?.id !== 'main-nav-user-button'
    ) {
      setUserLinksVisible(false);
    }
  };

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

          {/* {pluginsSectionLinks.length > 0 ? (
            <AtlasNavSection
              label={formatMessage({
                id: 'app.components.LeftMenu.plugins',
                defaultMessage: 'Plugins',
              })}
            >
              {pluginsSectionLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    as={RouterNavLink}
                    // @ts-expect-error the props from the passed as prop are not inferred // joined together
                    to={link.to}
                    key={link.to}
                    icon={<Icon />}
                  >
                    {formatMessage(link.intlLabel)}
                  </NavLink>
                );
              })}
            </AtlasNavSection>
          ) : null}

          {generalSectionLinks.length > 0 ? (
            <NavSection
              label={formatMessage({
                id: 'app.components.LeftMenu.general',
                defaultMessage: 'General',
              })}
            >
              {generalSectionLinks.map((link) => {
                const LinkIcon = link.icon;

                return (
                  <NavLink
                    as={RouterNavLink}
                    badgeContent={
                      link.notificationsCount && link.notificationsCount > 0
                        ? link.notificationsCount.toString()
                        : undefined
                    }
                    // @ts-expect-error the props from the passed as prop are not inferred // joined together
                    to={link.to}
                    key={link.to}
                    icon={<LinkIcon />}
                  >
                    {formatMessage(link.intlLabel)}
                  </NavLink>
                );
              })}
            </NavSection>
          ) : null} */}
        </AtlasNavSections>

        <NavFooter>
          <NavUser
            id="main-nav-user-button"
            ref={navUserRef}
            onClick={handleToggleUserLinks}
            initials={initials}
          >
            {userDisplayName}
          </NavUser>
          {userLinksVisible && (
            <LinkUserWrapper
              onBlur={handleBlur}
              padding={1}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <FocusTrap onEscape={handleToggleUserLinks}>
                <Flex direction="column" alignItems="stretch" gap={0}>
                  <LinkUser tabIndex={0} onClick={handleToggleUserLinks} to="/me">
                    <Typography>
                      {formatMessage({
                        id: 'global.profile',
                        defaultMessage: 'Profile',
                      })}
                    </Typography>
                  </LinkUser>
                  <LinkUser tabIndex={0} onClick={handleLogout} to="/auth/login">
                    <Typography textColor="danger600">
                      {formatMessage({
                        id: 'app.components.LeftMenu.logout',
                        defaultMessage: 'Logout',
                      })}
                    </Typography>
                    <Exit />
                  </LinkUser>
                </Flex>
              </FocusTrap>
            </LinkUserWrapper>
          )}

          <NavCondense onClick={() => setCondensed((s) => !s)}>
            {condensed
              ? formatMessage({
                  id: 'app.components.LeftMenu.expand',
                  defaultMessage: 'Expand the navbar',
                })
              : formatMessage({
                  id: 'app.components.LeftMenu.collapse',
                  defaultMessage: 'Collapse the navbar',
                })}
          </NavCondense>
        </NavFooter>
      </MainNav>
    </DarkTheme>
  );
};

export default LeftMenu;
export { LeftMenu };
