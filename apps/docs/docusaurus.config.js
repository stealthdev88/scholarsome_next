const lightCodeTheme = require('prism-react-renderer/themes/github');
require('dotenv').config();
const path = require('path');
const fs = require("fs");

const presets = [
  [
    '@docusaurus/preset-classic',
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl:
          'https://github.com/hwgilbert16/scholarsome/tree/develop/apps/docs',
        routeBasePath: '/',
      },
      theme: {
        customCss: require.resolve('./src/css/custom.css'),
      },
      blog: false,
    }),
  ],
];

const specPath = path.join(__dirname, '..', '..', 'dist', 'api-spec.json');

if (fs.existsSync(specPath)) {
  presets.push([
    'redocusaurus',
    {
      // Plugin Options for loading OpenAPI files
      specs: [
        {
          spec: specPath,
          route: '/api/',
        },
      ],
      // Theme Options for modifying how redoc renders them
      theme: {
        primaryColor: '#8338ff',
      },
    },
  ]);
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Scholarsome Handbook',
  url: `http://${process.env.HOST}`,
  baseUrl: '/handbook/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Scholarsome',
  projectName: 'Scholarsome',
  trailingSlash: true,
  staticDirectories: ['public', 'static'],

  presets,

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Scholarsome',
          src: 'img/logo.svg',
          href: '/',
        },
        items: [
          {
            to: `/`,
            position: 'left',
            label: 'Handbook',
            activeBaseRegex: '^(?!.*\\bapi\\b).*$'
          },
          {
            to: `/api`,
            position: 'left',
            label: 'API',
            activeBasePath: 'api'
          },
          {
            to: `http://${process.env.HOST}`,
            position: 'right',
            label: 'Back to Scholarsome',
            target: "_self"
          }
        ],
      },
      prism: {
        theme: lightCodeTheme,
      },
      colorMode: {
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
