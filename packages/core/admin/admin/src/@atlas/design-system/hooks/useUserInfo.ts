import { UserInfo, getUserInfo } from '@atlas/design-system/utils/getUserInfo';
import { getFetchClient } from '@strapi/helper-plugin';
import { useState, useEffect } from 'react';

const authUserInfo = getUserInfo(); // Initial user data, I think from auth. No idea why this doesn't include the same data as the admin/users/me endpoint

export default function useUserInfo(): UserInfo {
  const [userInfo, setUserInfo] = useState(authUserInfo);

  async function fetchMeData() {
    const data = await getFetchClient().get('/admin/users/me');
    const { username, firstname: firstName, lastname: lastName } = data?.data?.data;

    if (username) {
      setUserInfo((c) => ({ ...c, firstName, lastName, username }));
    }
  }

  useEffect(() => {
    fetchMeData();
  }, []);

  return userInfo;
}

export { useUserInfo };
