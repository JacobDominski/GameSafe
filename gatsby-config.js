module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "MaterialUI",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
