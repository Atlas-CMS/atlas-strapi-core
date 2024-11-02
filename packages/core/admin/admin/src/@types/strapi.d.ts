import { StrapiAppContextValue } from '@strapi/helper-plugin';

declare global {
  type MenuItem = StrapiAppContextValue['menu'][number];
  // Version of the main menu item where items can represent buttons.
  type MainMenuItem = Omit<Optional<StrapiAppContextValue['menu'][number], 'permissions'>, 'to'> & {
    onClick?: () => Promise<void>;
    to: string | null;
  };
}

export {};
