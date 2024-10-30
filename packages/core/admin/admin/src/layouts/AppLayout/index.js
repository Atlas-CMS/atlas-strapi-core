import React from 'react';

import { Box, Flex, SkipToContent } from '@strapi/design-system';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

const AtlasFlexBox = styled(Box).attrs({
  className: 'atlas-AtlasFlexBox-sds',
  id: 'atlas-content-container',
})`
  flex: 1;
`;

const AtlasOverflowWrapper = styled(Box).attrs({
  className: 'atlas-AtlasOverflowWrapper-sds',
  id: 'overflow-wrapper',
})`
  flex: 1;
`;

const AtlasFlex = styled(Flex).attrs({
  className: 'atlas-AtlasFlex-sds',
  id: 'atlas-layout-container',
})`
  align-items: flex-start;
`;

const AtlasBox = styled(Box).attrs({
  className: 'atlas-MainContainer-sds',
  id: 'atlas-main-container',
})``;

const AppLayout = ({ children, sideNav }) => {
  return (
    <AtlasBox background="neutral100">
      <AtlasFlex alignItems="flex-start">
        {sideNav}
        <AtlasFlexBox>
          <AtlasOverflowWrapper id="overflow-wrapper">{children}</AtlasOverflowWrapper>
        </AtlasFlexBox>
      </AtlasFlex>
    </AtlasBox>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sideNav: PropTypes.node.isRequired,
};

export default AppLayout;
