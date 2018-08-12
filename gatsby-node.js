/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const drugTemplate = path.resolve('./src/templates/drug.js')
  const articleTemplate = path.resolve('./src/templates/article.js')

  return graphql(`
    {
      adImage: file(
        relativePath: {eq: "assets/images/ads/14.png"},
      ) {
        childImageSharp {
          sizes {
            srcSet
          }
        }
      }
      drugs: allMarkdownRemark(
          limit: 1000
          filter: {id: {regex: "/index/"} }
        ) {
          edges {
            node {
              frontmatter {
                path
                name
                class
                aliases
                summary {
                  childMarkdownRemark {
                    internal {
                      content
                    }
                  }
                }
                health {
                  childMarkdownRemark {
                    internal {
                      content
                    }
                  }
                }
                law {
                  childMarkdownRemark {
                    internal {
                      content
                    }
                  }
                }
                routes {
                  name
                  duration {
                    childMarkdownRemark {
                      frontmatter {
                        total
                        onset
                        comeup
                        peak
                        offset
                        afterEffects
                        hangover
                      }
                    }
                  }
                  dosage {
                    childMarkdownRemark {
                      frontmatter {
                        threshold
                        light
                        common
                        strong
                        heavy
                      }
                    }
                  }
                }
                effects {
                  childMarkdownRemark {
                    internal {
                      content
                    }
                  }
                }
                molecules
                erowid
                psychonautwiki
              }
            }
          }
        }
      articles: allMarkdownRemark(
        limit: 1000
        filter: {id: {regex: "/artigos/"} }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              date
            }
            html
          }
        }
      }
    }
  `).then((result) => { //eslint-disable-line
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.drugs.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: drugTemplate,
        context: {
          drug: node.frontmatter,
          adImage: result.data.adImage.childImageSharp,
        }, // additional data can be passed via context
      })
    })
    result.data.articles.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: articleTemplate,
        context: {
          article: node,
        }, // additional data can be passed via context
      })
    })
  })
}

