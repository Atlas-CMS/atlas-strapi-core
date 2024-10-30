import React from 'react';

import { Box } from '@atlas/design-system';
import { AnErrorOccurred } from '@strapi/helper-plugin';

const ErrorFallback = () => {
  return (
    <Box padding={8}>
      <AnErrorOccurred />
    </Box>
  );
};

export default ErrorFallback;
