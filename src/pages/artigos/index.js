import React from 'react'
import { StaticQuery } from 'gatsby'
import ArticleCard from '../../components/ArticleCard'
import Layout from '../../Layout'

const Articles = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query articles {
          allMarkdownRemark(
            limit: 1000
            filter: { fileAbsolutePath: { regex: "/artigos/" } }
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  path
                }
                excerpt
              }
            }
          }
        }
      `}
      render={(data) => {
        const articles = data.allMarkdownRemark.edges
        return (
          <div>
            <section className="py-3 py-md-4 bg-blueLighter">
              <div className="container">
                <h4 className="text-uppercase text-muted">
                  <strong>Redução de danos</strong>
                </h4>
              </div>
            </section>
            <section className="py-3 py-md-4">
              <div className="container">
                <ul className="row list-unstyled mt-3">
                  {articles.map((article) => (
                    <li className="col-12 col-md-6">
                      <ArticleCard article={article.node} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )
      }}
    />
  </Layout>
)

export default Articles
