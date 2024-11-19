import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCustomFields } from '@strapi/helper-plugin';

const componentStore = new Map();

/**
 * @description
 * A hook to lazy load custom field components
 * @param {Array.<string>} componentUids - The uids to look up components
 * @returns object
 */
const useLazyComponents = (componentUids = []) => {
  const [lazyComponentStore, setLazyComponentStore] = useState(Object.fromEntries(componentStore));
  const customFieldsRegistry = useCustomFields();

  // Memoize the newUids array to prevent unnecessary re-renders
  // ILIAD: ATLAS: NOTE: CHANGE;
  const newUids = useMemo(
    () => componentUids.filter((uid) => !componentStore.get(uid)),
    [componentUids]
  );

  const [loading, setLoading] = useState(() => !!newUids.length);

  useEffect(() => {
    console.log('useLazyComponents', componentUids);
    const setStore = (store) => {
      setLazyComponentStore(store);
      setLoading(false);
    };

    const lazyLoadComponents = async (uids, components) => {
      console.log({ uids, components });

      const modules = await Promise.all(components);

      console.log({ modules });

      uids.forEach((uid, index) => {
        componentStore.set(uid, modules[index].default);
      });

      setStore(Object.fromEntries(componentStore));
    };

    if (newUids.length > 0) {
      setLoading(true);

      const componentPromises = newUids.reduce((arrayOfPromises, uid) => {
        const customField = customFieldsRegistry.get(uid);

        if (customField) {
          arrayOfPromises.push(customField.components.Input());
        }

        return arrayOfPromises;
      }, []);

      if (componentPromises.length > 0) {
        lazyLoadComponents(newUids, componentPromises);
      }
    }
  }, [newUids, customFieldsRegistry]);

  /**
   * Wrap this in a callback so it can be used in
   * effects to cleanup the cached store if required
   */
  const cleanup = useCallback(() => {
    componentStore.clear();
    setLazyComponentStore({});
  }, []);

  return { isLazyLoading: loading, lazyComponentStore, cleanup };
};

export default useLazyComponents;
