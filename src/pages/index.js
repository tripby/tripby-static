import React from 'react'
import Link from 'gatsby-link'
import * as Icon from 'react-feather'

import FeaturedContent from '../components/FeaturedContent'
import DrugCard from '../components/DrugCard'

const IndexPage = ({ data }) => {
  const drugs = data.drugs.edges
  return (
    <div>
      <FeaturedContent tagline="Leia a bula." />
      <section className="py-3 py-md-4">
        <div className="container">
          <h3 className="text-uppercase text-muted">Psicoativos</h3>
          <ul className="row list-unstyled mt-3">
            {drugs.map((drug) =>
              (
                <li className="col-12 col-md-4">
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
      filter: {id: {regex: "/index/"} }
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
  }
`
