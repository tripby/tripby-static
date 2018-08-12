module.exports = {
  siteMetadata: {
    title: 'TRIPBY · Informações psicoativas',
    siteUrl: 'https://tripby.org',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-61977009-1',
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-sitemap',
  ],
}
