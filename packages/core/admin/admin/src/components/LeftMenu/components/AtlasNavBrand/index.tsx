// Styles
import styles from './atlas-nav-brand.module.scss';
import clsx from 'clsx';

// Utils
import { useIntl } from 'react-intl';

// Components
import { NavLink } from 'react-router-dom';
import { M_Typography } from '@atlas/design-system';

// Types
type AtlasNavBrandProps = ComponentBaseProps & {
  condensed: boolean;
  workplace: string;
  title: string;
  icon: string;
};

const AtlasNavBrand = ({
  condensed = false,
  workplace,
  title,
  icon,
  // Base Props
  className,
  ...props
}: AtlasNavBrandProps) => {
  const { formatMessage } = useIntl();
  return (
    <NavLink
      className={clsx(styles.atlasNavBrand, 'atlas-NavLink-ii', className)}
      data-condensed={condensed}
      to="/"
    >
      <div className={styles.iconContainer}>
        <img
          src={icon}
          className={styles.icon}
          alt={formatMessage({
            id: 'app.components.LeftMenu.logo.alt',
            defaultMessage: 'Application logo',
          })}
        />
      </div>
      <div className={styles.textOverflowContainer}>
        <div className={styles.textOverflow}>
          <M_Typography className={styles.title} fontWeight="bold" as="span">
            {title}
          </M_Typography>
          <M_Typography className={styles.workspace} variant="pi" as="p">
            {workplace}
          </M_Typography>
        </div>
      </div>
    </NavLink>
  );
};

export default AtlasNavBrand;
export { AtlasNavBrand };
