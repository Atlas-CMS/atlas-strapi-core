# Atlas

Atlas is a custom-built desktop application designed to enhance the capabilities of users working with Content Management Systems (CMS). Built upon Strapi, Atlas is not an off-the-shelf solution but a tailored system that offers substantial performance improvements, especially for media-rich and content-heavy platforms.

## Overview

Current CMS solutions often provide generic features that may not fully address the specific needs of organizations. Atlas aims to solve these issues by offering a comprehensive solution that focuses on current and future requirements. Our primary goal is to provide a system that doesn't need to be replaced but can be iterated upon to cover additional needs.

Having identified common concerns and pain points regarding website management and customer engagement, Atlas addresses many issues currently faced by teams. By introducing advanced technology, including Artificial Intelligence (AI), we bring greater synergy to our proposed solutions. This, along with an extensive technical overhaul, will significantly benefit users.

## Developer Experience

Atlas, in combination with our other tools ([@iliad.dev/iliad-standard-issue](https://github.com/iliadwebdev/iliad-standard-issue)) can completely transform the developer experience. Enjoy strong types by default, even for arbitrary API endpoints. Do away with hundreds of lines of boilerplate; just write simple, semantic code and get your data right away.

### Dead simple queries

![Simply Query Comparison](https://github.com/Atlas-CMS/atlas-strapi-core/blob/develop/md-assets/q_compare.png)

>  This is literally from a [strapi tutorial](https://strapi.io/blog/client-side-search-for-static-sites-with-strapi-nextjs-fusejs-and-cloudflare). Forget that!

### Strong types, directly from Atlas, by default!


!(Simple Query Comparison)[https://github.com/Atlas-CMS/atlas-strapi-core/blob/develop/md-assets/auto_types.png]
![Simple Query Comparison](https://github.com/Atlas-CMS/atlas-strapi-core/blob/develop/md-assets/auto_types.png)

Plus autocomplete for all content types, single types, and even arbitrary API endpoints.

> Auth functionality to come!




## Features

Atlas offers a range of features designed to improve workflow efficiency and user engagement:

### 1. Brand Growth

- **Site Analytics**: Gain insights into who views your webpage, articles, and newsletters. Understand reader engagement to make informed decisions on content creation.
- **Search Engine Optimization (SEO)**: Implement top-of-the-line SEO practices to improve search rankings and attract more site traffic.

### 2. Customer Support and Assistance

- **User-Friendly Interface**: A streamlined and visual overhaul of the Strapi interface for easier navigation and reduced overwhelm.
- **Content Drafts and To-Do Lists**: Create drafts and see what content looks like before publishing. Keep track of tasks with integrated to-do lists.
- **Advanced Text Editor**: Overhauled text editor compatible with Google Docs, Microsoft Word, etc. Includes features like image placement, grids, graphs, and content styling.
- **Scheduled Publishing**: Publish content immediately or schedule it for a future date. Set content to automatically unpublish when no longer relevant.
- **Calendar Integration**: Visualize publications and track progress in real-time with an automatically generated calendar.
- **Data Export and Graph Generation**: Extract data and generate graphs for analytics like page views or viewer retention.

### 3. Mail Integration

- **Email Support**: Send emails directly to individuals on your mailing list from content produced within the text editor.
- **User Subscriptions**: Allow users to sign up for email notifications for specific content types.
- **Click-Through Rate Tracking**: Monitor the effectiveness of emails by tracking engagement metrics.
- **Email List Management**: Manage multiple email lists with precise setup to ensure correct and error-free email distribution.

### 4. Artificial Intelligence

- **Integrated AI Assistant**: Leverage a personalized Large Language Model (LLM) trained on your content to assist in generating new content and insights.
- **Customizable Data Input**: Feed various types of data into the AI model for diverse outputs.
- **Time-Saving Content Generation**: Generate content based on your company's data without manual configuration.

### 5. Website Quality of Life

- **User Engagement Features**: Optional commenting system with extensive moderation capabilities to drive engagement and gather feedback.
- **Google Maps Integration**: Seamless integration with Google Maps for event locations, providing accurate directions to users.
- **Phone Number Authentication**: Full phone number authentication to ensure accurate data collection during sign-ups or contact forms.
- **Enhanced Search Functionality**: Implementation of Meili-Search for high-performance, optimized search capabilities.

### 6. Technical Performance Enhancements

- **Improved Admin Panel Performance**: Faster load times and API pulls for a smoother backend experience.
- **Automatic API Documentation**: Simplify third-party data linking with automatic API documentation.
- **Media Management Overhaul**: Automatic processing and conversion of uploaded media to web-optimized formats. Features include blur hash generation and automatic color palette extraction.
- **URL Redirects**: Create SEO-friendly URL redirects to improve search rankings and user experience.

## Conclusion

Atlas is a comprehensive solution that combines the power of a marketing agency, development team, SEO specialist, data analyst, and copywriter into a single, user-friendly application. It synergizes with existing workflows and stands to significantly enhance your digital presence and operational efficiency.

This solution is designed to be easily customizable, allowing for quick iterations to meet evolving needs. We are excited to bring Atlas to your team and believe it will greatly benefit your organization.

## Acknowledgments

We extend our sincere gratitude to everyone considering Atlas. Your interest means a great deal to us, and we are committed to tailoring our approach to meet your unique requirements. We are happy to refine our proposal further based on any feedback or specific preferences you may have.

We look forward to contributing to your continued success.


---
---

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
  - atlas-design-system - Contains the patched version of @strapi/design-system (ick) (TBD)
  - atlas-strapi-plugins - Contains all of the atlas feature plugins, as well as any core plugins.
  - patched-strapi-plugins - Contains any open source Strapi plugins whose dependencies have been patched.
  - atlas-instance-manager - Contains the instance manager server (TBD)
  - atlas-electron-client - Contains the Electron client wrapper for Atlas.

- @iliad/

  - iliad-hermes-ts - Iliad's mixed-method networking library with first class support for Strapi configuration

- @smoke/
  - iliad-strapi-adapter - Owen's Strapi interface library.

\*you are here
