// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lisk Documentation',
  //tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.lisk.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/lisk-documentation/',

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
      src: '/js/matomo.js',
      async: false,
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // sidebarCollapsible: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LiskHQ/lisk-documentation/tree/main/',
          routeBasePath: '/',
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
            './src/css/sidebar.css',
          ]},
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      // Replace with your project's social card
      image: 'img/lisk-icon-light.svg',
      navbar: {
        logo: {
          alt: 'Lisk Logo',
          src: 'img/lisk-icon-light.svg',
          srcDark: 'img/lisk-icon-dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'documentationSidebar',
            position: 'left',
            label: 'Documentation',
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},*/
          // {
          //   href: 'https://github.com/LiskHQ',
          //   html: `
          //   <img src="img/github-mark-white.svg" width="10%" class="git-dark" />
          //   <img src="img/github-mark.svg" width="10%"  class="git-light" />
          // `,
          //   position: 'left',
          // },
          {
            href: 'https://stack.optimism.io',

            html: `
              <img src="img/op_stack_dark.svg" class="op-dark" />
              <img src="img/op_stack.svg" class="op-light" />
            `,
            position: 'right',
          },
          {
            href: 'https://github.com/LiskHQ',
            html: `
            <img src="img/github-mark-white.svg" class="git-dark" />
            <img src="img/github-mark.svg" class="git-light" />
          `,
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Lisk Documentation',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                html: `
                <div class="image-row">
                    <a href="https://lisk.chat" target="_blank" aria-label="Discord">
                      <img src="img/icon-discord-white.svg" class="discord-dark" />
                      <img src="img/icon-discord.svg" class="discord-light" />
                    </a>
                    <p></p>
                    <a href="https://twitter.com/LiskHQ" target="_blank" aria-label="Twitter">
                      <img src="img/twitter-x-white.svg" class="x-dark" />
                    </a>
                </div>
                  `,
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                html: `
                    <a href="https://github.com/LiskHQ" target="_blank" aria-label="GitHub" >
                    <img src="img/github-mark-white.svg" class="git-dark" />
                    <img src="img/github-mark.svg" class="git-light" />
                    </a>
                  `,
              },
              /*{
                 label: 'Blog',
                 to: '/blog',
               },*/
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Onchain Foundation.`,
      },
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.palenight,
        additionalLanguages: ['solidity'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;