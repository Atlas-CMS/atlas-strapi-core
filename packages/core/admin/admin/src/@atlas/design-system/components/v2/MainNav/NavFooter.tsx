import React from 'react';

import { Box } from '../../Box';

export interface NavFooterProps {
  children: React.ReactNode;
}

export const NavFooter = ({ children }: NavFooterProps) => {
  return (
    <Box className="atlas-NavFooter-sds" position="relative">
      {children}
    </Box>
  );
};
