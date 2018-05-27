import React from 'react'
import Link from 'gatsby-link'
import * as Icon from 'react-feather'

import FeaturedContent from '../components/FeaturedContent'
import DrugCard from '../components/DrugCard'
import ArticleCard from '../components/ArticleCard'

const IndexPage = ({ data }) => {
  const drugs = data.drugs.edges
  const articles = data.articles.edges
  return (
    <div>
      <FeaturedContent tagline="Leia a bula." />
      <section className="py-3 py-md-4">
        <div className="container">
          <h3 className="text-uppercase text-muted">Psicoativos</h3>
          <ul className="row list-unstyled mt-3">
            {drugs.map((drug) =>
              (
                <li className="col-12 col-md-6 col-xl-4" key={drug.node.frontmatter.name}>
                  <DrugCard
                    drug={drug.node.frontmatter}
                  />
                </li>
              ))}
          </ul>
          <Link to="/psicoativos">
            <div className="d-inline-flex align-items-center text-uppercase font-weight-normal">
              Todos os psicoativos
              <div className="ml-2"><Icon.ChevronRight size={12} /></div>
            </div>
          </Link>
          <div className="my-5"><hr /></div>
          <h3 className="text-uppercase text-muted">Artigos</h3>
          <ul className="row list-unstyled mt-3">
            {articles.map((article) =>
              (
                <li className="col-12 col-md-6" key={article.node.frontmatter.title}>
                  <ArticleCard article={article.node} />
                </li>
              ))}
          </ul>
          <Link to="/artigos">
            <div className="d-inline-flex align-items-center text-uppercase font-weight-normal">
              Todos os artigos
              <div className="ml-2"><Icon.ChevronRight size={12} /></div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}


export default IndexPage

export const query = graphql`
  query data {
    drugs: allMarkdownRemark(
      limit: 6
      filter: {id: {regex: "/index/"}, frontmatter: {featured: {eq: true}} }
      sort: {order: ASC, fields: [frontmatter___name]}
    ) {
      edges {
        node {
          frontmatter {
            name
            class
            path
            molecules
            aliases
          }
        }
      }
    }
    articles: allMarkdownRemark(
      limit: 2
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
