require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE
const siteAddress = new URL("https://www.juanherreros.com")

module.exports = {
  siteMetadata: {
    siteTitle: `Juan Herreros Elorza`,
    siteTitleAlt: `Juan Herreros Elorza - Personal site`,
    siteHeadline: `Juan Herreros Elorza - Personal site`,
    siteUrl: `https://juanherreros.com`,
    siteDescription: `This is my personal web page. Here I host my CV and a blog about the creation of the project.`,
    siteLanguage: `en`,
    author: `Juan Herreros Elorza`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "juanherreros.com",
        protocol: siteAddress.protocol.slice(0, -1),
        hostname: siteAddress.hostname,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
          {
            title: `CV`,
            slug: `/cv`,
          },
        ],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/jherreros?tab=repositories`,
          },          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/juan-herreros-elorza/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteAddress.href.slice(0, -1),
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Juan Herreros Elorza personal site`,
        short_name: `Juan`,
        description: `This is the personal website of Juan Herreros Elorza.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
