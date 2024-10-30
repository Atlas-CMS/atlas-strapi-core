type Providers =
  | 'local'
  | 'cloudinary'
  | 'aws-s3'
  | 'imgix'
  | 'strapi-provider-upload';

type AtlasImageData = {
  placeholderDataUrl: string;
  'data-nimg': any;
};

type ProviderMetadata = {
  public_id: string;
  resource_type: string;
};

type BaseStrapiMediaAsset = Partial<{
  ext?: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  url: string;
  height: number;
  width: number;
  path?: Nullable<string>;
  // placeholder: Nullable<string>;
  placeholder: any;
}>;

type formatSizes = {
  thumbnail: string;
  medium: string;
  large: string;
  small: string;
};

type FormatMediaAsset = BaseStrapiMediaAsset & {
  provider_metadata: ProviderMetadata;
};

type FullStrapiMediaAsset = BaseStrapiMediaAsset & {
  alternativeText: Nullable<string>;
  caption: Nullable<string>;
  provider_metadata: ProviderMetadata;
  folderPath: any;
  updatedAt: any;
  createdAt: any;
  provider: any;

  mime: any;
  url: any;
  ext: any;
  hash: any;

  formats: Nullable<{
    thumbnail?: FormatMediaAsset;
    medium?: FormatMediaAsset;
    large?: FormatMediaAsset;
    small?: FormatMediaAsset;
  }>;
};

type StrapiMediaAsset = FullStrapiMediaAsset & AtlasImageData;

type StrapiMediaAssetResponse = {
  data: {
    id: number;
    attributes: StrapiMediaAsset;
  };
};
