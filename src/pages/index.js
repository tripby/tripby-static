import React from 'react'
import Link from 'gatsby-link'

import FeaturedContent from '../components/FeaturedContent'

const IndexPage = () => (
  <div>
    <FeaturedContent tagline="Leia a bula." />
    <section className="py-3 py-md-4">
      <div className="container">
        <h1>Psicoativos</h1>       
      </div>
    </section>
  </div>
)

export default IndexPage
