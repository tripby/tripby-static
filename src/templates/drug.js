import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { TabGroup, Tab } from 'material-tabs'
import Link from 'gatsby-link'
import qs from 'qs'
import Markdown from 'react-markdown'

import Alert from '../components/Alert'

const tabStyle = {
  color: '#ee6e73',
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

const defaultTabs = [
  { link: 'overview', label: 'Sumário' },
  { link: 'effects', label: 'Efeitos' },
  { link: 'health', label: 'Saúde' },
  { link: 'law', label: 'Lei' },
]

class Drug extends Component {
  state = {

  }
  getTab() {
    const { tab } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const { drug } = this.props.pathContext
    switch (tab) {
      case 'overview':
        return (
          <Markdown source={drug.summary} />
        )
      case 'effects':
        return (
          <div>
            <Alert icon="Info" type="info">
              Os efeitos listados abaixo raramente (ou nunca) ocorrerão de uma só vez, mas doses maiores aumentarão as chances e são mais propensas a induzir uma gama completa de efeitos.
            </Alert>
            <Markdown source={drug.effects} />
          </div>
        )
      case 'health':
        return (
          <Markdown source={drug.health} />
        )
      case 'law':
        return (
          <Markdown source={drug.law} />
        )
      default:
        return (
          <Markdown source={drug.summary} />
        )
    }
  }
  mapTabs() {
    const { drug } = this.props.pathContext
    return defaultTabs.map((tab, index) => (
      <Link to={`${drug.path}?tab=${tab.link}`} key={index}>
        <Tab style={tabStyle}>
          {tab.label}
        </Tab>
      </Link>
    ))
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
                    (<img
                      style={{ maxWidth: 96 }}
                      alt={`Molécula ${molecule}`}
                      src={require(`../assets/images/molecules/${molecule}.svg`)} //eslint-disable-line
                    />))}
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
                <div className="card" style={{ borderRadius: '4px' }}>
                  <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                    <div style={{ minWidth: 560, margin: '0 auto' }}>
                      <TabGroup
                        // defaultSelectedTab={defaultTabs.findIndex((tab) => tab.link === this.props.params.tab)}
                        style={{ indicator: { backgroundColor: '#f6b2b5' } }}
                      >
                        {this.mapTabs()}
                      </TabGroup>
                    </div>
                  </div>
                  <div className="card-body">
                    {this.getTab()}
                  </div>
                </div>
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
