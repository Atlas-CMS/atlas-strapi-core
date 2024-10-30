import * as React from 'react';

// Styles
import styles from './left-menu.module.scss';
import styled from 'styled-components';
import clsx from 'clsx';

// Components
import { Box, Divider, Flex, FocusTrap } from '@atlas/design-system';
import { Typography } from '@atlas/design-system';
import { LinkUserWrapper, LinkUser } from './components';

import {
  MainNav,
  NavLink,
  NavUser,
  NavBrand,
  NavFooter,
  NavSection,
  NavSections,
  NavCondense,
} from '@strapi/design-system/v2';

// Icons
import { Plausible } from '@atlas/design-system/icons';
import { Exit, Write } from '@strapi/icons';

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
  StrapiAppContextValue,
} from '@strapi/helper-plugin';

import { useConfiguration } from '@hooks/useConfiguration';
import { useAtlasConfig } from '@hooks/useAtlasConfig';
import { Menu } from '@hooks/useMenu';

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
  const allLinks = [...generalSectionLinks, ...pluginsSectionLinks];
  const { floatingTop, mySite, plugins, floatingBottom } = sortMenuItems(allLinks, sideMenu);

  React.useEffect(() => {
    console.log({ floatingTop, mySite, plugins, floatingBottom }, allLinks, sideMenu);
  }, [floatingTop, mySite, plugins, floatingBottom, allLinks, sideMenu]);

  // Event Handlers
  const handleToggleUserLinks = () => setUserLinksVisible((prev) => !prev);

  const handleClickOnLink = (destination: string) => {
    trackUsage('willNavigate', { from: pathname, to: destination });
  };

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
    <MainNav
      className={clsx(styles.mainNav, 'atlas-MainNav-sds')}
      data-condensed={condensed}
      condensed={condensed}
    >
      <NavBrand
        workplace={client.organizationTitle}
        title={dashboard.title}
        as={RouterNavLink}
        icon={
          <img
            src={logos.menu.default}
            alt={formatMessage({
              id: 'app.components.LeftMenu.logo.alt',
              defaultMessage: 'Application logo',
            })}
          />
        }
      />
      <NavSections>
        <NavLink
          as={RouterNavLink}
          // @ts-expect-error the props from the passed as prop are not inferred // joined together
          to="/content-manager"
          icon={<Write />}
          onClick={() => handleClickOnLink('/content-manager')}
        >
          {formatMessage({ id: 'global.content-manager', defaultMessage: 'Content manager' })}
        </NavLink>

        {pluginsSectionLinks.length > 0 ? (
          <NavSection
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
                  onClick={() => handleClickOnLink(link.to)}
                >
                  {formatMessage(link.intlLabel)}
                </NavLink>
              );
            })}
          </NavSection>
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
                  onClick={() => handleClickOnLink(link.to)}
                >
                  {formatMessage(link.intlLabel)}
                </NavLink>
              );
            })}
          </NavSection>
        ) : null}
      </NavSections>

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
  );
};

export default LeftMenu;
export { LeftMenu };
