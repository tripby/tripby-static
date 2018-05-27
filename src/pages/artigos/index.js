import React from 'react'
import ArticleCard from '../../components/ArticleCard'

const Articles = ({ data }) => {
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
            {articles.map((article) =>
              (
                <li className="col-12 col-md-6">
                  <ArticleCard
                    article={article.node}
                  />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export const query = graphql`
  query articles {
    allMarkdownRemark(
      limit: 1000
      filter: {id: {regex: "/artigos/"} }  
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
`

export default Articles
