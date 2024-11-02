// Mantine
import { generateColors } from '@mantine/colors-generator';
import { createTheme, rem } from '@mantine/core';

const mantineConfig = {
  theme: createTheme({
    autoContrast: true,
    colors: {
      // 'strapi-purple': generateColors('#4945ff'),
      'iliad-blue': generateColors('#00ace0'),
      'strapi-purple': [
        '#ffffff', // 0
        '#1C1C4E', // 1
        '#292875', // 2
        '#322FC1', // 3
        '#4945FF', // 4
        '#635CFF', // 5
        '#BBBBFF', // 6
        '#DADAFF', // 7
        '#E9E9FF', // 8
        '#F6F6FF', // 9
      ],
      'strapi-gray': [
        '#ffffff', // 0
        '#F6F6F9', // 1
        '#EAEAEF', // 2
        '#DCDCE4',
        '#C0C0CF',
        '#A5A5BA',
        '#8E8EA9',
        '#666687',
        '#32324D',
        '#212134',
        '#000000',
      ],
    },
    primaryColor: 'strapi-purple',
    primaryShade: 4,

    defaultRadius: 'xl',
  }),
};

export default mantineConfig;
export { mantineConfig };
