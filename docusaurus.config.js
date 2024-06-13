// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import * as process from 'process';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lisk Documentation',
  //tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: process.env.LISK_DOC_URL ?? 'https://docs.lisk.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.LISK_DOC_BASE_URL ?? '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LiskHQ', // Usually your GitHub org/user name.
  projectName: 'lisk-documentation', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: process.env.LISK_DOC_URL ?? '/' + 'js/matomo.js',
      async: true,
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // sidebarCollapsible: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LiskHQ/lisk-documentation/tree/main/',
          routeBasePath: '/docs',
        },
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        blog: false,
        theme: {
          customCss: [
            './src/css/custom.css',
          ]
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-user',
        path: 'docs-user',
        routeBasePath: 'user',
        sidebarPath: require.resolve('./userSidebar.js'),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: false,
        },
      },
      // Replace with your project's social card
      image: '/img/lisk-icon-light.svg',
      navbar: {
        logo: {
          alt: 'Lisk Logo',
          src: '/img/lisk-docs-light.svg',
          srcDark: '/img/lisk-docs-dark.svg',
        },
        items: [

          {
            type: 'docSidebar',
            sidebarId: 'documentationSidebar',
            position: 'left',
            to: 'docs/intro',
            label: 'Building with Lisk',
          },
          {
            type: 'docSidebar',
            sidebarId: 'userSidebar',
            label: 'Using Lisk',
            to: 'docs-user/intro',
            position: 'left',
            docsPluginId: 'docs-user',
            activeBasePath: 'docs-user',
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},*/
          {
            href: 'https://docs.optimism.io/',

            html: `
              <img src="/img/op_stack_dark.svg" class="op-dark" />
              <img src="/img/op_stack.svg" class="op-light" />
            `,
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            items: [
              {
                html: `
              <img src="/img/lisk-icon-light-footer.svg" class="lsk-light" />
              <img src="/img/lisk-icon-dark-footer.svg" class="lsk-dark" />
            `},
            ],
          },
          {
            items: [
              {
                label: 'X',
                href: 'https://twitter.com/LiskHQ',
                className: 'footer__links footer__link-item social_links',
              },
              {
                label: 'Discord',
                href: 'https://lisk.chat',
                className: 'footer__links footer__link-item social_links',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/LiskHQ',
                className: 'footer__links footer__link-item social_links',
              },
            ],
          },
          {
            items: [
              {
                html: `<p class=copyright>Copyright © ${new Date().getFullYear()} Onchain Foundation.</p>`
              },
            ],
          },
        ],

      },
      algolia: {
        appId: 'VJKTDEEV6C',
        apiKey: 'cc866f1f0b964dd7552427d70a95ab18',
        indexName: "lisk",
        contextualSearch: false,
        debug: false,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.oceanicNext,
        additionalLanguages: ['solidity', 'bash', 'javascript', 'typescript', 'rust', 'css', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;