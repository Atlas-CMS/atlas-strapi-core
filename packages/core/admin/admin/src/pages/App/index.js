/**
 *
 * App.js
 *
 */

import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';

import {
  auth,
  LoadingIndicatorPage,
  prefixFileUrlWithBackendUrl,
  TrackingProvider,
  useAppInfo,
  useFetchClient,
  useNotification,
} from '@strapi/helper-plugin';
import merge from 'lodash/merge';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../components/PrivateRoute';
import { ADMIN_PERMISSIONS_CE } from '../../constants';
import { useConfiguration } from '../../hooks/useConfiguration';
import { useEnterprise } from '../../hooks/useEnterprise';
import { createRoute, makeUniqueRoutes } from '../../utils';
import AuthPage from '../AuthPage';
import NotFoundPage from '../NotFoundPage';
import UseCasePage from '../UseCasePage';

import { ROUTES_CE, SET_ADMIN_PERMISSIONS } from './constants';

const AuthenticatedApp = lazy(() =>
  import(/* webpackChunkName: "Admin-authenticatedApp" */ '../../components/AuthenticatedApp')
);

function App() {
  const adminPermissions = useEnterprise(
    ADMIN_PERMISSIONS_CE,
    async () => (await import('../../../../ee/admin/constants')).ADMIN_PERMISSIONS_EE,
    {
      combine(cePermissions, eePermissions) {
        // the `settings` NS e.g. are deep nested objects, that need a deep merge
        return merge({}, cePermissions, eePermissions);
      },

      defaultValue: ADMIN_PERMISSIONS_CE,
    }
  );
  const routes = useEnterprise(
    ROUTES_CE,
    async () => (await import('../../../../ee/admin/pages/App/constants')).ROUTES_EE,
    {
      defaultValue: [],
    }
  );
  const toggleNotification = useNotification();
  const { updateProjectSettings } = useConfiguration();
  const { formatMessage } = useIntl();
  const [{ isLoading, hasAdmin, uuid, deviceId }, setState] = useState({
    isLoading: true,
    hasAdmin: false,
  });
  const dispatch = useDispatch();
  const appInfo = useAppInfo();
  const { get, post } = useFetchClient();

  const authRoutes = useMemo(() => {
    return makeUniqueRoutes(
      routes.map(({ to, Component, exact }) => createRoute(Component, to, exact))
    );
  }, [routes]);

  const [telemetryProperties, setTelemetryProperties] = useState(null);

  useEffect(() => {
    dispatch({ type: SET_ADMIN_PERMISSIONS, payload: adminPermissions });
  }, [adminPermissions, dispatch]);

  useEffect(() => {
    const currentToken = auth.getToken();

    const renewToken = async () => {
      try {
        const {
          data: {
            data: { token },
          },
        } = await post('/admin/renew-token', { token: currentToken });
        auth.updateToken(token);
      } catch (err) {
        // Refresh app
        auth.clearAppStorage();
        window.location.reload();
      }
    };

    if (currentToken) {
      renewToken();
    }
  }, [post]);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { hasAdmin, uuid, menuLogo, authLogo },
          },
        } = await get(`/admin/init`);

        updateProjectSettings({
          menuLogo: prefixFileUrlWithBackendUrl(menuLogo),
          authLogo: prefixFileUrlWithBackendUrl(authLogo),
        });

        setState({ isLoading: false, hasAdmin, uuid, deviceId });
      } catch (err) {
        console.error(err);
        toggleNotification({
          message: { id: 'app.containers.App.notification.error.init' },
          type: 'warning',
        });
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleNotification, updateProjectSettings]);

  const setHasAdmin = (hasAdmin) => setState((prev) => ({ ...prev, hasAdmin }));

  const trackingInfo = useMemo(
    () => ({
      uuid,
      telemetryProperties,
      deviceId,
    }),
    [uuid, telemetryProperties, deviceId]
  );

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <Suspense fallback={<LoadingIndicatorPage />}>
      <TrackingProvider value={trackingInfo}>
        <Switch>
          {authRoutes}
          <Route
            path="/auth/:authType"
            render={(routerProps) => (
              <AuthPage {...routerProps} setHasAdmin={setHasAdmin} hasAdmin={hasAdmin} />
            )}
            exact
          />
          <PrivateRoute path="/usecase" component={UseCasePage} />
          <PrivateRoute path="/" component={AuthenticatedApp} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </TrackingProvider>
    </Suspense>
  );
}

export default App;
