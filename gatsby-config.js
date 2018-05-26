module.exports = {
  siteMetadata: {
    title: 'TRIPBY · Informações psicoativas',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-61977009-1",
      }
    }
  ],
}
