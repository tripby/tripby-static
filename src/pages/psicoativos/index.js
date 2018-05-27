import React from 'react'
import DrugCard from '../../components/DrugCard'

const Drugs = ({ data }) => {
  const drugs = data.allMarkdownRemark.edges
  return (
    <div>
      <section className="py-3 py-md-4 bg-blueLighter">
        <div className="container">
          <h4 className="text-uppercase text-muted"><strong>Psicoativos</strong></h4>
        </div>
      </section>
      <section className="py-3 py-md-4">
        <div className="container">
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

export const query = graphql`
  query drugs {
    allMarkdownRemark(
      limit: 1000
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

export default Drugs
