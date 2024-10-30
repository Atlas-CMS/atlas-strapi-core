import { StrapiAppContextValue } from '@strapi/helper-plugin';

declare global {
  type MenuItem = StrapiAppContextValue['menu'][number];
}

export {};
