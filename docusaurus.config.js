// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import * as process from 'process';
import { generatedDocs } from './plugins/generated-bridged-token-adresses-docs';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lisk Documentation',
  //tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.LISK_DOC_URL ?? 'https://docs.lisk.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.LISK_DOC_BASE_URL ?? '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  /* organizationName: 'LiskHQ', // Usually your GitHub org/user name.
  projectName: 'lisk-documentation', // Usually your repo name. 
  trailingSlash: false, */

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ind'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      ind: {
        label: 'Indonesian',
      },
    },
  },
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
          //editUrl: 'https://github.com/LiskHQ/lisk-documentation/tree/main/',
          routeBasePath: '/',
          remarkPlugins: [generatedDocs],
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
        gtag: {
          trackingID: 'G-PQC7PTFFLK',
        },
      }),
    ],
  ],

  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "1e2ab9ba-0296-4e2c-b8a5-4d53f85744c9",
      "data-project-name": "Lisk",
      "data-project-color": "#000000",
      "data-project-logo": "https://lisk.com/wp-content/uploads/2024/11/Share-image.jpg",
      "data-button-image-height": "0",
      "data-button-image-width": "0",
      "data-button-height": "2.5rem",
      "data-button-width": "5rem",
      "data-button-bg-color": "#ffffff",
      "data-button-text-color": "#000000",
      "data-button-text-font-size": "1rem",
      "data-button-text-shadow": "0 0 0px rgba(0, 0, 0, 0)",
      "data-button-border-radius": "0rem",
      "data-button-hover-bg-color": "#e6e6e6",
      "data-user-analytics-fingerprint-enabled": "true",
      "data-modal-title": "Lisk AI",
      "data-modal-example-questions-title": "Try asking me...",
      "data-modal-example-questions": "What is Lisk?, How do I create an ERC20 token?, How do I get faucet funds?, Share information about Lisk RPC API.",
      "data-button-text": "Ask AI",
      "data-modal-title-color": "#ffffff",
      "data-modal-header-bg-color": "#000000",
      "data-modal-full-screen-on-mobile": "false",
      "data-consent-required": "true",
      async: true,
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: true,
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
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'intro',
            label: 'Building with Lisk',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'userSidebar',
            label: 'Using Lisk',
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},*/
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