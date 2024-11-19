"use strict";

export default ({ env }) => {
  return {
    "plugin-atlas-ckeditor": {
      resolve: "./src/plugins/plugin-atlas-ckeditor",
      enabled: true,
    },
    "bold-title-editor": {
      resolve: "./src/plugins/strapi-plugin-bold-title-editor",
      enabled: true,
    },
    "react-icons": {
      resolve: "./src/plugins/strapi-plugin-react-icons",
      enabled: true,
    },
  };
};
