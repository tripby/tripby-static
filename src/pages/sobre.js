import React from 'react'
import Layout from '../layouts'

const About = () => (
  <Layout>
    <div>
      <section className="py-3 py-md-4 bg-blueLighter">
        <div className="container container--tight">
          <h1 className="text-uppercase">
            <strong>Sobre o Tripby</strong>
          </h1>
        </div>
      </section>
      <section className="py-3 py-md-4">
        <div className="container container--tight">
          <div className="blog-post">
            <p>
              O Tripby é uma plataforma que reúne informações sobre substâncias
              psicoativas. Não condenamos nem promovemos o uso de drogas; nosso
              objetivo é difundir conhecimento pertinente ao uso dessas
              substâncias para fins de pesquisa e redução de danos.
            </p>
          </div>
        </div>
      </section>
    </div>
  </Layout>
)

export default About
