import React from 'react'
import Link from 'gatsby-link'

import FeaturedContent from '../components/FeaturedContent'
import DrugCard from '../components/DrugCard'

const IndexPage = ({ data }) => {
  const drugs = data.drugs.edges
  return (
    <div>
      <FeaturedContent tagline="Leia a bula." />
      <section className="py-3 py-md-4">
        <div className="container">
          <h2>Psicoativos</h2>
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
