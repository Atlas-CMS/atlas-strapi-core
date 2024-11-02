import type { ButtonProps as MantineButtonProps, MantineSize } from '@mantine/core';
import type { ButtonProps as StrapiButtonProps } from '../StrapiButton';

const simpleMaps: Record<string, string> = {
  variant: 'data-strapi-variant',
  startIcon: 'leftSection',
  endIcon: 'rightSection',
  fullWidth: 'fullWidth',
  icon: 'leftSection',
  loading: 'loading',
  as: 'component',
};

const DEFAULT_MANTINE_SIZE: MantineSize = 'sm';
function mapButtonSize(size: StrapiButtonProps['size']): MantineSize {
  if (!size) return DEFAULT_MANTINE_SIZE;

  return ({
    S: 'xs',
    M: 'sm',
    L: 'md',
  }[size] || DEFAULT_MANTINE_SIZE) as MantineSize;
}

function mapMantineVariantProps(variant: StrapiButtonProps['variant']) {
  return {
    default: {},
    secondary: {
      // color: 'strapi-purple.7',
      variant: 'light',
    },
    tertiary: {
      color: 'strapi-gray.2',
    },
    danger: {},
    'danger-light': {},
    ghost: {},
    success: {},
    'success-light': {},
  }[variant || 'default'];
}

export function mapButtonPropsToMantine(props: StrapiButtonProps & {}): MantineButtonProps & {
  component?: React.ElementType;
} {
  const mappedProps: Partial<MantineButtonProps> = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (simpleMaps[key]) {
        return { ...acc, [simpleMaps[key]]: value };
      }
      return acc;
    },
    {}
  );

  // Calculate specific props
  const calculatedProps = {
    ...mapMantineVariantProps(props.variant),
    size: mapButtonSize(props.size),
  };

  let collectedProps = { ...props, ...mappedProps };

  // Delete stinky props
  for (const key of Object.keys(simpleMaps)) {
    delete (collectedProps as any)[key];
  }

  delete (collectedProps as any)['data-variant'];

  console.log({
    collectedProps,
  });

  return {
    ...collectedProps,
    ...calculatedProps,
  } as MantineButtonProps & {}; // This is broken
}

export default mapButtonPropsToMantine;
