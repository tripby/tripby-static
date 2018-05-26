import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

class Drug extends Component {
  state = {

  }
  render() {
    const { drug } = this.props.pathContext
    return (
      <div>
        <Helmet
          title={`${drug.title} · efeitos, duração, dosagem, saúde e lei · TRIPBY`}
        >
          <meta
            name="description"
            content={`Entenda melhor sobre ${drug.title} e como usar de forma segura. ${drug.title} é ${drug.class.toLowerCase()} e também é conhecido como ${drug.aliases.join(', ')}.`}
          />
        </Helmet>
        <section className="py-3 py-md-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="d-flex align-items-center">
                  <div className="flex-1">
                    <h1>
                      <strong>{drug.title}</strong>
                    </h1>
                  </div>
                  {drug.molecules.map((molecule) =>
                    <img style={{ maxWidth: 96 }} src={require(`../assets/images/molecules/${molecule}.svg`)} />)}

                </div>
                <p className="text-uppercase text-pinkLight">
                  <strong>{drug.class}</strong>
                </p>
                <div className="mb-3">
                  <h6 className="text-uppercase text-muted">Nomes comuns</h6>
                  {drug.aliases.join(', ')}
                </div>
                <h6 className="text-uppercase text-muted">Rotas de administração</h6>
                {drug.aliases.join(', ')}
              </div>
              <div className="col-12 col-lg-8 mt-3">

              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Drug.propTypes = {
  pathContext: PropTypes.object,
}

export default Drug
