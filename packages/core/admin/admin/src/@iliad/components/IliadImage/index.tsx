// Styles
import styles from './iliad-image.module.scss';
import clsx from 'clsx';

// Components
import { Image, ImageProps as MantineImageProps } from '@mantine/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

// Types
export type IliadImageProps = NextImageProps &
  MantineImageProps & {
    placeholderDataUrl?: string;
  };

type StrapiMediaAssetFormat = {
  height?: number;
  width?: number;
  url: string;
};

interface BaseStrapiMediaAsset {
  alternativeText?: string;
  placeholder?: string;
  caption?: string;
  height?: number;
  width?: number;
  mime?: string;
  // id: string;
  url: string;
}

const PRODUCTION = process.env.NODE_ENV === 'production';

interface StrapiMediaAsset extends BaseStrapiMediaAsset {
  formats?: Record<string, StrapiMediaAssetFormat>;
}

// StrapiImageProps
export type StrapiImageProps = Partial<Omit<IliadImageProps, 'src'>> & {
  format?: 'thumbnail' | 'medium' | 'large' | 'small' | 'original';
} & XOR<
    { strapiMediaAsset: StrapiMediaAsset },
    { mediaAsset: BaseStrapiMediaAsset }
  >;

// Helper Functions
function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

function removeStrapiProps<T extends object>(
  props: T
): Omit<T, keyof StrapiPropsToRemove> {
  const propsToOmit: (keyof StrapiPropsToRemove)[] = [
    'provider_metadata',
    'folderPath',
    'data-nimg',
    'updatedAt',
    'createdAt',
    'provider',
    'formats',
    'mime',
    'hash',
    'url',
    'ext',
  ];

  // @ts-ignore
  return omit(props, propsToOmit);
}

type StrapiPropsToRemove = {
  provider_metadata?: any;
  'data-nimg'?: any;
  folderPath?: any;
  updatedAt?: any;
  createdAt?: any;
  provider?: any;
  formats?: any;
  mime?: any;
  hash?: any;
  url?: any;
  ext?: any;
};

function coerceMediaAsset(
  mediaAsset?: BaseStrapiMediaAsset,
  strapiMediaAsset?: StrapiMediaAsset
): StrapiMediaAsset | undefined {
  if (strapiMediaAsset) {
    return strapiMediaAsset;
  } else if (mediaAsset) {
    return mediaAsset as StrapiMediaAsset;
  }
  return undefined;
}

// APIResponseData<"plugin::upload.file"> - NOTE: For future reference

function transformIliadImageProps(
  Component: React.ComponentType<IliadImageProps>
) {
  return function IliadImage({
    src,
    alt,
    className,
    placeholderDataUrl,
    ...props
  }: IliadImageProps) {
    // Generate alt text from src, if not provided
    if (!alt && src && typeof src === 'string') {
      alt = src.split('/').pop()?.split('.')[0] || 'Image';
    }

    if (!alt && !PRODUCTION) {
      console.warn(
        '[IliadImage] Image component is missing alt prop. Please provide one for better accessibility.'
      );
    }

    // Add standard classes
    className = clsx(className, 'iliad-Image');

    // Remove Strapi props
    const sanitizedProps = removeStrapiProps(props);

    const transformedProps: IliadImageProps = {
      className,
      src,
      alt,
      ...sanitizedProps,
    };

    if (placeholderDataUrl) {
      transformedProps.blurDataURL = placeholderDataUrl;
      transformedProps.placeholder = 'blur';
    }

    return <Component {...transformedProps} />;
  };
}

function extractIliadProps(Component: React.ComponentType<IliadImageProps>) {
  return function StrapiImage({
    format = 'original',
    placeholderDataUrl,
    strapiMediaAsset,
    mediaAsset,
    ...props
  }: StrapiImageProps) {
    let media = coerceMediaAsset(mediaAsset, strapiMediaAsset);

    if (!media) {
      console.warn('[IliadImage] No media asset provided.');
      return null;
    }

    if (format !== 'original' && media.formats) {
      const specifiedFormat = media.formats[format];
      if (specifiedFormat) {
        media = {
          ...media,
          ...specifiedFormat,
        };
      } else {
        console.warn(
          `[IliadImage] Format "${format}" not found for image ${media.url}. Using original image.`
        );
      }
    }

    const extractedProps: Partial<IliadImageProps> = {
      alt: props.alt || media.caption || media.alternativeText,
      height: props.height || media.height,
      width: props.width || media.width,
      src: media.url,
    };

    if (media.placeholder || placeholderDataUrl) {
      extractedProps.placeholderDataUrl =
        placeholderDataUrl || media.placeholder;
    }
    // @ts-ignore
    return <Component {...props} {...extractedProps} />;
  };
}

const IliadImageComponent = ({ className, ...props }: IliadImageProps) => {
  return (
    <Image
      component={NextImage}
      className={clsx(className, styles.mainContainer)}
      {...props}
    />
  );
};

export type UnknownImageProps = XOR<IliadImageProps, StrapiImageProps>;

// Transformations
const IliadImage = transformIliadImageProps(IliadImageComponent);
const StrapiImage = extractIliadProps(IliadImage);

// Exports
export { IliadImage, StrapiImage };
export default IliadImage;
