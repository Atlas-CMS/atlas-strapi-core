'use server';

// Components
import { StrapiImage } from '.';

// Server
import strapi from '@strapi/server';

// Types
import type { APIResponse, APIResponseData } from 'iliad-strapi-adapter';
import type { StrapiImageProps } from '.';

type FromStrapiServerProps = Partial<StrapiImageProps> & {
  assetId: string | number;
};

/**
 * @unstable
 * @experimental
 *
 * This component is marked as unstable and experimental.
 * It may change in the future and should be used with caution.
 * Performance characteristics have not been evaluated.
 */
const Remote_StrapiImage = async ({
  assetId,
  ...props
}: FromStrapiServerProps) => {
  const {
    data: asset,
    error,
  }: StandardResponse<{
    // NOTE: TODO: API responses are completely different for media assets 🤦‍♀️
    // No idea what's going on here tbh
    data: APIResponseData<'plugin::upload.file'>['attributes'] & { id: number };
  }> = await strapi.hermes.axios.get(`/upload/files/${assetId}`, {});

  if (error || !asset?.data) {
    console.error(
      `[Iliad] FromStrapiServer: Error fetching asset with id ${assetId}`,
      error
    );
    return null;
  }

  // Dunno what's going on here tbh
  const mediaAsset = asset.data as BaseStrapiMediaAsset;

  // @ts-ignore
  return <StrapiImage mediaAsset={mediaAsset} {...props} />;
};

export default Remote_StrapiImage;
export { Remote_StrapiImage };
