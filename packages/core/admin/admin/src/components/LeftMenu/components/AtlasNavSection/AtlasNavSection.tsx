// Styles
import styles from './atlas-nav-section.module.scss';
import clsx from 'clsx';

// React
import { Children } from 'react';

// Components - Strapi
import { useMainNav } from '@atlas/design-system/components/v2/MainNav/MainNavContext';

// Components - Atlas
import { M_Typography, MainNavProps, Typography } from '@atlas/design-system';

// Components - Mantine
import { Box, Divider, Flex, FlexProps, VisuallyHidden } from '@mantine/core';

// Utils
import { getId, getIntl } from '@components/LeftMenu/utils/functions';
import { useIntl } from 'react-intl';

// Types
import { StrapiAppContextValue } from '@strapi/helper-plugin';
import NavItem from '../SideMenuNavItem';
// type MenuItem = StrapiAppContextValue['menu'][number];

type AtlasNavSectionProps = ComponentBaseProps &
  FlexProps & {
    horizontal?: boolean;
    spacing?: number;
    label?: string;
  };
const AtlasNavSection = ({
  horizontal = false,
  spacing = 8,
  label,
  // Base props
  className,
  children,
  ...props
}: AtlasNavSectionProps) => {
  const condensed = useMainNav();

  console.log({ label });

  return (
    <Flex
      className={clsx(styles.navSection, 'atlas-MainNavSection-ii', className)}
      data-condensed={condensed}
      direction="column"
      align="stretch"
      gap={2}
    >
      {!!label && (
        <Box className={styles.labelContainer}>
          <M_Typography
            lineClamp={1}
            className={styles.label}
            variant="sigma"
            textColor="neutral600"
          >
            {label}
          </M_Typography>
          <div className={styles.linePlaceholder}>
            <div className={styles.line} />
          </div>
        </Box>
      )}
      <Flex
        direction={horizontal ? 'row' : 'column'}
        align={horizontal ? 'center' : 'stretch'}
        component="ul"
        gap={spacing}
        // {...props}
      >
        {Children.map(children, (child, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{child}</li>;
        })}
      </Flex>
    </Flex>
  );
};

export default AtlasNavSection;
export { AtlasNavSection, CastAtlasNavSection };

type CastAtlasNavSectionProps = AtlasNavSectionProps & {
  navLinks: Array<_MenuItem>;
};

type _MenuItem = Optional<MenuItem, 'permissions' | 'Component' | 'notificationsCount'>;

const CastAtlasNavSection = ({ navLinks, ...props }: CastAtlasNavSectionProps) => {
  const { formatMessage } = useIntl();

  if (!navLinks?.length) return null;

  return (
    <AtlasNavSection {...props}>
      {navLinks.map((link) => {
        const intl = getIntl(link as MenuItem);
        const label = formatMessage(intl);

        return (
          <NavItem
            className={styles.altasNavSectionNavItem}
            title={label}
            key={intl.id}
            {...link}
          />
        );
      })}
    </AtlasNavSection>
  );
};
