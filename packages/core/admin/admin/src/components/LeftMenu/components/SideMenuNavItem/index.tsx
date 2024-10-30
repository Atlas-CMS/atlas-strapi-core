// Styles
import styles from './side-menu-nav-item.module.scss';
import clsx from 'clsx';

import { M_Typography, normalizeStyles, Typography } from '@atlas/design-system';
import { Box, Badge } from '@mantine/core';

import { NavLink as RouterNavLink } from 'react-router-dom';
import { ElementType } from 'react';

// Mantine

type NavItemProps = ChildlessComponentBaseProps & {
  notificationsCount?: number;
  icon: ElementType<any>;
  title: string;
  to: string;
} & Record<string, any>;
const NavItem = ({ notificationsCount, icon: Icon, to, className, ...props }: NavItemProps) => {
  delete props.permissions;
  delete props.intlLabel;

  return (
    <RouterNavLink
      className={clsx('atlas-NavLink-ii', styles.navItem, className)}
      data-notifications={!!notificationsCount}
      activeClassName={styles.active}
      {...props}
      to={to}
    >
      <div className={styles.iconContainer}>
        <Icon height={14} className={styles.icon} />
      </div>
      <div className={styles.textOverflowContainer}>
        <div className={styles.textOverflow}>
          <M_Typography className={styles.title}>{props.title}</M_Typography>
        </div>
      </div>
      {notificationsCount && (
        <div className={styles.notificationsContainer}>
          <Badge className={clsx(styles.notifications, 'atlas-NotificationsBadge-ii')}>
            {notificationsCount}
          </Badge>
        </div>
      )}
    </RouterNavLink>
  );
};

export default NavItem;
export { NavItem };
