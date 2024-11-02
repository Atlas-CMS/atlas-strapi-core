import { auth } from '@strapi/helper-plugin';

export type UserInfo = {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  avatar: string;
  email: string;
};

const defaults = {
  firstName: '',
  lastName: '',
  fullName: '',
  username: '',
  avatar: '',
  email: '',
};

export function getUserInfo(): UserInfo {
  const userInfo = auth.get('userInfo');
  console.log({ userInfo });
  if (!userInfo || typeof userInfo === 'string') {
    return defaults;
  }

  const {
    firstname = defaults.firstName,
    lastname = defaults.lastName,
    username = defaults.username,
    email = defaults.email,
  } = userInfo;

  return {
    ...defaults,
    fullName: `${firstname} ${lastname}`,
    firstName: firstname,
    lastName: lastname,
    username,
    email,
  };
}
