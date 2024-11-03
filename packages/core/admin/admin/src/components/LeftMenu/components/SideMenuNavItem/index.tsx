// Styles
import styles from './side-menu-nav-item.module.scss';
import clsx from 'clsx';

// Components
import { M_Typography } from '@atlas/design-system';
import { Badge, Avatar } from '@mantine/core';

// React
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ElementType } from 'react';
import ConditionalWrapper from '@iliad/components/ConditionalWrapper';

// Types
type NavItemProps = ChildlessComponentBaseProps & {
  notificationsCount?: number;
  icon: ElementType<any>;
  to: string | null;
  title: string;
} & Record<string, any>;

const NavItem = ({ notificationsCount, icon: Icon, to, className, ...props }: NavItemProps) => {
  delete props.Component; // This comes from the docs plugin...
  delete props.permissions;
  delete props.intlLabel;

  return (
    <ConditionalWrapper
      condition={to}
      wrapper={(c, _to) => {
        return (
          <RouterNavLink
            className={clsx('atlas-NavLink-ii', styles.navItem, className)}
            data-notifications={!!notificationsCount}
            activeClassName={styles.active}
            {...props}
            to={_to}
          >
            {c}
          </RouterNavLink>
        );
      }}
      falseWrapper={(c, _to) => {
        return (
          <div
            className={clsx('atlas-NavLink-ii', styles.fauxNavLink, styles.navItem, className)}
            data-notifications={!!notificationsCount}
            {...props}
          >
            {c}
          </div>
        );
      }}
    >
      <>
        <div className={styles.iconContainer}>
          <Icon height={14} className={styles.icon} />
        </div>
        <div className={styles.textOverflowContainer}>
          <div className={styles.textOverflow}>
            <M_Typography className={styles.title}>{props.title}</M_Typography>
          </div>
        </div>
        {!!notificationsCount && (
          <div className={styles.notificationsContainer}>
            <Badge className={clsx(styles.notifications, 'atlas-NotificationsBadge-ii')}>
              {notificationsCount}
            </Badge>
          </div>
        )}
      </>
    </ConditionalWrapper>
  );
};

export default NavItem;
export { NavItem };
