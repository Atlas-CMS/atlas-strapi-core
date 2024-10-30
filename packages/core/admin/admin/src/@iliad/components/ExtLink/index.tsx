// Styles
import styles from './ext-link.module.scss';
import clsx from 'clsx';

// React / Next
import Link from 'next/link';

// Components
import ExternalAnchor from './ExternalAnchor';

// Functions
import {
  isLinkExternal,
  willRenderLink,
  extractLinkProps,
  normalizeRootDomain,
} from './utils/functions/helperFunctions';

// Types
import type { ContextModalProps } from '@mantine/modals';
import type { LinkProps } from 'next/link';
export type ExtLinkProps = ComponentBaseProps &
  Omit<LinkProps, 'href'> & {
    externalWarningModalProps?: ContextModalProps;
    externalWarningModal?: string | boolean;
    microSite?: boolean;
    href?: string;
  };
export type TransformedExtLinkProps = ExtLinkProps & {
  external: boolean;
  target?: string;
  href?: string;
  rel?: string;
  externalWarning?: {
    externalWarningModalProps: ContextModalProps;
    enabled: boolean;
    modal: string;
  };
};

// Constants
const DEFAULT_MODAL_NAME = 'ExternalLinkWarningModal';

function transformExtLinkProps(Component: any, microSite: boolean = false) {
  return function ExtLink({
    externalWarningModal = true,
    href,
    ...props
  }: ExtLinkProps) {
    if (props?.microSite) {
      microSite = props.microSite;
    }

    if (microSite) {
      // Micro-sites will append the root domain to the href
      // And open in the current tab
      handleMicroSite: {
        if (!href) break handleMicroSite;

        if (!process?.env?.NEXT_PUBLIC_MICRO_SITE_ROOT_DOMAIN) {
          console.warn(
            `[Iliad] Micro-site root domain not set. Please set the NEXT_PUBLIC_MICRO_SITE_ROOT_DOMAIN environment variable.`
          );
          break handleMicroSite;
        }

        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `[Iliad] Micro-site root domain is set. Skipping href transformation in development.`
          );
          break handleMicroSite;
        }

        const rootDomain = normalizeRootDomain(
          process.env.NEXT_PUBLIC_MICRO_SITE_ROOT_DOMAIN
        );

        if (href.startsWith('/')) {
          href = `${rootDomain}${href}`;
        }
      }
    }

    const external = !!href ? isLinkExternal(href) : false;

    const transformedProps: TransformedExtLinkProps = {
      href,
      external,
      ...props,
    };

    // NOTE: TODO: This is AIDS
    if (externalWarningModal) {
      let modalName = DEFAULT_MODAL_NAME || 'default';

      if (typeof externalWarningModal === 'string') {
        modalName = externalWarningModal;
      }

      transformedProps.externalWarning = {
        externalWarningModalProps:
          props?.externalWarningModalProps || ({} as ContextModalProps),
        modal: modalName,
        enabled: true,
      };
    } else {
      transformedProps.externalWarning = {
        externalWarningModalProps: {} as ContextModalProps,
        modal: 'default',
        enabled: false,
      };
    }

    if (external) {
      transformedProps.rel = 'noopener noreferrer';
      if (!microSite) {
        transformedProps.target = '_blank';
      }
    }

    transformedProps.className = clsx(
      styles.extLink,
      props.className,
      'ii-ext-link'
    );

    // Remove this property, until used to prevent passing it to DOM elements
    delete transformedProps.microSite;

    return <Component {...transformedProps} />;
  };
}

function ExtLinkBaseComponent({
  externalWarning,
  className,
  external,
  children,
  href,
  ...props
}: TransformedExtLinkProps) {
  if (!href) return children;

  const _props = { href, className: clsx(className), ...props };

  // Internal links are rendered with Next.js Link
  if (!external) {
    return <Link {..._props}>{children}</Link>;
  }

  // If the link is external, and the external warning modal is enabled
  // we must render a client-side version of the tag to access the
  // mantine modal context
  if (externalWarning?.enabled === true) {
    return (
      <ExternalAnchor modal={externalWarning.modal} {..._props}>
        {children}
      </ExternalAnchor>
    );
  }

  // If this is an external link with no special logic, simply render an anchor tag
  return <a {..._props}>{children}</a>;
}

export const ExtLink = transformExtLinkProps(ExtLinkBaseComponent, false);
export const MicroLink = transformExtLinkProps(ExtLinkBaseComponent, true);

export { willRenderLink, isLinkExternal, extractLinkProps };
export default ExtLink;
