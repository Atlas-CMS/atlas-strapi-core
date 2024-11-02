// Mantine
import { generateColors } from '@mantine/colors-generator';
import { createTheme, rem } from '@mantine/core';

const mantineConfig = {
  theme: createTheme({
    autoContrast: true,
    colors: {
      // 'strapi-purple': generateColors('#7B79FF'),
      'strapi-purple': generateColors('#4945ff'),
      'iliad-blue': generateColors('#00ace0'),
    },
    primaryColor: 'strapi-purple',
    primaryShade: 3,
  }),
};

export default mantineConfig;
export { mantineConfig };
