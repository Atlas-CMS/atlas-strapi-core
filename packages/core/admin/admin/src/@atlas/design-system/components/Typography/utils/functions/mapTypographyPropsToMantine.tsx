// Styles
import styles from '../../typography.module.scss';
import clsx from 'clsx';

// Types
import type { TypographyProps, TextProps } from '../../Typography';
type TypographyPropsSansChildren = Omit<TypographyProps, 'children'>;

const simpleMaps: Record<string, string> = {
  textDecoration: 'td',
  textTransform: 'tt',
  textColor: 'color',
  textAlign: 'align', // Check this one...
  fontSize: 'size',
  as: 'component',
  fontWeight: 'fw',
  lineHeight: 'lh',
};

export default function mapTypographyPropsToMantine({
  ...props
}: TypographyPropsSansChildren): TextProps {
  const mappedProps: Record<string, any> = Object.entries(props).reduce((acc, [key, value]) => {
    if (simpleMaps[key]) {
      return { ...acc, [simpleMaps[key]]: value };
    }

    return acc;
  }, {} as TextProps);

  props?.variant && (mappedProps['data-variant'] = props.variant);
  props?.ellipsis && (mappedProps['className'] = clsx(styles.ellipses, props?.className));

  return mappedProps;
}

export { mapTypographyPropsToMantine };
