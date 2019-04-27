module.exports = {
  siteMetadata: {
    title: 'Burn UI',
    siteUrl: 'https://burn-ui.com',
    author: 'Matheus Marques',
    description: 'React components to help web development',
    keywords: [
      "react",
      "react-component",
      "burn-ui",
      "burn"
    ],
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Burn UI docs',
        short_name: 'Burn UI docs',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: `#E54200`,
        display: 'standalone',
        icon: 'src/assets/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
