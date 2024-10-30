// React
import React, { useEffect, useRef } from 'react';

// Pages
import { selectAdminPermissions } from '../../../pages/App/selectors';

// Hooks
import useContentManagerInitData from './useContentManagerInitData';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

// Utils
import ItemTypes from '../../utils/ItemTypes';
import getTrad from '../../utils/getTrad';
import sortBy from 'lodash/sortBy';

// Context
import ModelsContext from '../../contexts/ModelsContext';
import { MantineProvider } from '@mantine/core';

// Components - Library
import { Route, Switch, Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import {
  useGuidedTour,
  AnErrorOccurred,
  LoadingIndicatorPage,
  CheckPagePermissions,
} from '@strapi/helper-plugin';
import { Helmet } from 'react-helmet';
import { HeaderLayout, Layout, Main } from '@strapi/design-system';

// Components - Internal
import { ComponentDragPreview } from './components/ComponentDragPreview';
import CollectionTypeRecursivePath from '../CollectionTypeRecursivePath';
import { RelationDragPreview } from './components/RelationDragPreview';
import SingleTypeRecursivePath from '../SingleTypeRecursivePath';
import { CardDragPreview } from './components/CardDragPreview';
import ComponentSettingsView from '../ComponentSetttingsView';
import { DragLayer } from '../../../components/DragLayer';

// Components - Errors
import NoContentType from '../NoContentType';
import NoPermissions from '../NoPermissions';

import LeftMenu from './LeftMenu';

function renderDraglayerItem({ type, item }) {
  if ([ItemTypes.EDIT_FIELD, ItemTypes.FIELD].includes(type)) {
    return <CardDragPreview labelField={item.labelField} />;
  }

  /**
   * Because a user may have multiple relations / dynamic zones / repeable fields in the same content type,
   * we append the fieldName for the item type to make them unique, however, we then want to extract that
   * first type to apply the correct preview.
   */
  const [actualType] = type.split('_');

  switch (actualType) {
    case ItemTypes.COMPONENT:
    case ItemTypes.DYNAMIC_ZONE:
      return <ComponentDragPreview displayedValue={item.displayedValue} />;

    case ItemTypes.RELATION:
      return (
        <RelationDragPreview
          displayedValue={item.displayedValue}
          status={item.status}
          width={item.width}
        />
      );

    default:
      return null;
  }
}

const App = () => {
  const { status, collectionTypeLinks, singleTypeLinks, models, refetchData } =
    useContentManagerInitData();
  const contentTypeMatch = useRouteMatch(`/content-manager/:kind/:uid`);
  const permissions = useSelector(selectAdminPermissions);
  const { startSection } = useGuidedTour();
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();

  // Refs
  const startSectionRef = useRef(startSection);

  const authorisedModels = sortBy([...collectionTypeLinks, ...singleTypeLinks], (model) =>
    model.title.toLowerCase()
  );

  useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current('contentManager');
    }
  }, []);

  if (status === 'loading') {
    return (
      <Main data-component="mainContainer" aria-busy="true">
        <HeaderLayout
          title={formatMessage({
            id: getTrad('header.name'),
            defaultMessage: 'Content',
          })}
        />
        <LoadingIndicatorPage />
      </Main>
    );
  }

  // Array of models that are displayed in the content manager
  const supportedModelsToDisplay = models.filter(({ isDisplayed }) => isDisplayed);

  // Redirect the user to the 403 page
  if (
    authorisedModels.length === 0 &&
    supportedModelsToDisplay.length > 0 &&
    pathname !== '/content-manager/403'
  ) {
    return <Redirect to="/content-manager/403" />;
  }

  // Redirect the user to the create content type page
  if (supportedModelsToDisplay.length === 0 && pathname !== '/content-manager/no-content-types') {
    return <Redirect to="/content-manager/no-content-types" />;
  }

  if (!contentTypeMatch && authorisedModels.length > 0) {
    return (
      <Redirect
        to={`${authorisedModels[0].to}${
          authorisedModels[0].search ? `?${authorisedModels[0].search}` : ''
        }`}
      />
    );
  }

  return (
    <div id="atlasStyleWrapperOuter">
      <Layout special={true} sideNav={<LeftMenu />}>
        <div id="atlasStyleWrapperInner">
          <DragLayer renderItem={renderDraglayerItem} />
          <ModelsContext.Provider value={{ refetchData }}>
            <Switch>
              <Route path="/content-manager/components/:uid/configurations/edit">
                <CheckPagePermissions
                  permissions={permissions.contentManager.componentsConfigurations}
                >
                  <ComponentSettingsView />
                </CheckPagePermissions>
              </Route>
              <Route
                path="/content-manager/collectionType/:slug"
                component={CollectionTypeRecursivePath}
              />
              <Route path="/content-manager/singleType/:slug" component={SingleTypeRecursivePath} />
              <Route path="/content-manager/403">
                <NoPermissions />
              </Route>
              <Route path="/content-manager/no-content-types">
                <NoContentType />
              </Route>
              <Route path="" component={AnErrorOccurred} />
            </Switch>
          </ModelsContext.Provider>
        </div>
      </Layout>
    </div>
  );
};

export { App };

export default function () {
  const { formatMessage } = useIntl();

  return (
    <>
      <Helmet
        title={formatMessage({
          id: getTrad('plugin.name'),
          defaultMessage: 'Content Manager',
        })}
      />
      <MantineProvider>
        <App />
      </MantineProvider>
    </>
  );
}
