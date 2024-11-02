// Styles
import styles from './user-menu.module.scss';
import clsx from 'clsx';

// React
import { CSSProperties, useEffect, useState } from 'react';

// Utils
import { useMainNav } from '@atlas/design-system/components/v2/MainNav/MainNavContext';
import { useElementSize, useClickOutside } from '@mantine/hooks';
import { useUserInfo } from '@atlas/hooks';

// Components
import { TextOverflowContainer, AvatarWithContext, M_Typography } from '@atlas/design-system';
import { CastAtlasNavSection } from '../AtlasNavSection';
import { Box } from '@mantine/core';

type UserMenuProps = ChildlessComponentBaseProps & {
  nestedLinks: Array<MainMenuItem>;
};

const UserMenu = ({
  nestedLinks,
  // Base props
  className,
  ...props
}: UserMenuProps) => {
  const { fullName, username } = useUserInfo();
  const [open, setOpen] = useState(false);
  const condensed = useMainNav();

  // Refs for measurements
  const { ref: shRef, height: shHeight } = useElementSize();
  const { ref: ofRef, height: ofHeight } = useElementSize();
  const masterRef = useClickOutside(() => setOpen(false));

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (condensed && open) {
      timeout = setTimeout(() => {
        setOpen(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [condensed]);

  return (
    <div
      className={styles.overflow}
      style={
        {
          '--ch-height': ofHeight || 'glorp',
          '--sh-height': shHeight || 'glorp',
        } as CSSProperties
      }
    >
      <Box
        className={clsx(styles.userMenuMainContainer, 'atlas-UserMenu-ii', className)}
        data-condensed={condensed}
        data-open={open}
        ref={masterRef}
        onClick={() => {
          setOpen(true);
        }}
        {...props}
      >
        <div ref={shRef} className={styles.staticHeader}>
          <Box className={styles.userInformationContainer}>
            <AvatarWithContext className={styles.profilePicture} />
            <TextOverflowContainer hidden={condensed} className={styles.nameUsername}>
              <M_Typography className={styles.name}>{fullName}</M_Typography>
              {username && (
                <M_Typography className={styles.username}>@{username}</M_Typography>
              )}{' '}
            </TextOverflowContainer>
          </Box>
        </div>
        <div className={styles.linksOverflowContainer}>
          <div ref={ofRef} className={styles.linksOverflow}>
            <CastAtlasNavSection gap={`2px`} navLinks={nestedLinks} className={styles.navSection} />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default UserMenu;
export { UserMenu };
