import { useUserInfo } from '@atlas/hooks';
import { Avatar } from '@mantine/core';

const AvatarWithContext = ({ ...props }) => {
  const { fullName } = useUserInfo();

  //   ILIAD: ATLAS: TODO: Add a default avatar image
  return <Avatar color="initials" name={fullName} {...props} />;
};

export default AvatarWithContext;
export { AvatarWithContext };
