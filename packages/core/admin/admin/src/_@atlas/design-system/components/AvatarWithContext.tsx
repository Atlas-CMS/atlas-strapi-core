import { useUserInfo } from '@atlas/design-system/hooks';
import { Avatar } from '@mantine/core';

const AvatarWithContext = ({ ...props }) => {
  const { fullName, username } = useUserInfo();
  let src;
  if (username?.toLowerCase().includes('smoke3785')) {
    src = 'https://avatars.githubusercontent.com/u/51245634?v=4';
  }

  //   ILIAD: ATLAS: TODO: Add a default avatar image
  return <Avatar color="initials" src={src} name={fullName} {...props} />;
};

export default AvatarWithContext;
export { AvatarWithContext };
