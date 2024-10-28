# Atlas Strapi Core

This is a forked version of Strapi `v4.14.5`. To start the development panel, navigate to `packages/core/admin` and run `yarn develop`. This will start the admin server.

## Next steps

- Create Atlas server instance that can:

  1. Run with the watch-admin command, allowing the admin panel to live reload when it detects changes in the `atlas-strapi-core` monorepo.
  2. Resolve all strapi dependencies as atlas dependencies instead.

     - Figure out how to actually build and collect dependencies
     - Publish these somewhere - could theoretically ghetto-patch the dependency again, assuming I can collect and publish the distributes version.

## New Atlas structure

- @atlas/

  - atlas-strapi-core\* - Contains this repo
  - atlas-strapi-plugins - Contains all of the atlas feature plugins, as well as any core plugins.
  - patched-strapi-plugins - Contains any open source Strapi plugins whose dependencies have been patched.
  - atlas-instance-manager - Contains the instance manager server (TBD)
  - atlas-design-system - Contains the patched version of @strapi/design-system (ick) (TBD)
  - atlas-electron-client - Contains the Electron client wrapper for Atlas.

- @iliad/

  - iliad-hermes-ts - Iliad's mixed-method networking library with first class support for Strapi configuration

- @smoke/
  - iliad-strapi-adapter - Owen's Strapi interface library.

\*you are here
