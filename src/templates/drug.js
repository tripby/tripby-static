import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { TabGroup, Tab } from 'material-tabs'
import Link from 'gatsby-link'
import qs from 'qs'
import Markdown from 'react-markdown'
import * as Icon from 'react-feather'
import { Collapse } from 'reactstrap'

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
          <Markdown source={drug.summary.childMarkdownRemark.internal.content} />
        )
      case 'effects':
        return (
          <div>
            <Alert icon="Info" type="info">
              Os efeitos listados abaixo raramente (ou nunca) ocorrerão de uma só vez, mas doses maiores aumentarão as chances e são mais propensas a induzir uma gama completa de efeitos.
            </Alert>
            <Markdown source={drug.effects.childMarkdownRemark.internal.content} />
          </div>
        )
      case 'health':
        return (
          <Markdown source={drug.health.childMarkdownRemark.internal.content} />
        )
      case 'law':
        return (
          <Markdown source={drug.law.childMarkdownRemark.internal.content} />
        )
      default:
        return (
          <Markdown source={drug.summary.childMarkdownRemark.internal.content} />
        )
    }
  }
  mapTabs() {
    const { drug } = this.props.pathContext
    return defaultTabs.map((tab) => (
      <Link to={`${drug.path}?tab=${tab.link}`} key={tab.link}>
        <Tab style={tabStyle}>
          {tab.label}
        </Tab>
      </Link>
    ))
  }
  handleRouteCollapse(route) {
    if (this.state.activeRoute === route.name) {
      this.setState({ activeRoute: null })
    } else if (route.duration || route.dosage) {
      this.setState({ activeRoute: route.name })
    }
  }
  render() {
    const { drug } = this.props.pathContext
    return (
      <div>
        <Helmet
          title={`${drug.name} · efeitos, duração, dosagem, saúde e lei · TRIPBY`}
        >
          <meta
            name="description"
            content={`Entenda melhor sobre ${drug.name} e como usar de forma segura. ${drug.name} é ${drug.class.toLowerCase()} e também é conhecido como ${drug.aliases.join(', ')}.`}
          />
        </Helmet>
        <section className="py-3 py-md-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="d-flex align-items-center">
                  <div className="flex-1">
                    <h1>
                      <strong>{drug.name}</strong>
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
                {drug.routes.map((route) => (
                  <div className="card border-0 my-1">
                    <button
                      className="text-left card-header d-flex"
                      style={{
                        background: 'none',
                        cursor: 'pointer',
                        border: 0,
                        padding: '0.5rem 0.75rem',
                      }}
                      onClick={() => this.handleRouteCollapse(route)}
                    >
                      <div className="flex-1">{route.name}</div>
                      <div className="d-flex align-items-center text-muted">
                        <div className="mr-2 d-flex">
                          {route.dosage && (<small>dosagem</small>)}
                          {(route.dosage && route.duration) && (<small className="mx-1">/</small>)}
                          {route.dosage && (<small>duração</small>)}
                        </div>
                        {this.state.activeRoute === route.name ? <Icon.ChevronUp /> : (route.duration || route.dosage) && <Icon.ChevronDown />}
                      </div>
                    </button>
                    <Collapse isOpen={this.state.activeRoute === route.name}>
                      <div className="card-body">
                        {route.dosage && (
                          <div>
                            <h6 className="text-center text-uppercase">
                              <strong>Dosagem</strong>
                            </h6>
                            <table className="table">
                              <thead>
                                <td><strong>Nível</strong></td>
                                <td className="text-right"><strong>Dose</strong></td>
                              </thead>
                              <tbody>
                                {route.dosage.childMarkdownRemark.frontmatter.threshold && (
                                  <tr>
                                    <td>Mínimo</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.threshold}</td>
                                  </tr>
                                )}
                                {route.dosage.childMarkdownRemark.frontmatter.light && (
                                  <tr>
                                    <td>Leve</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.light}</td>
                                  </tr>
                                )}
                                {route.dosage.childMarkdownRemark.frontmatter.common && (
                                  <tr>
                                    <td>Comum</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.common}</td>
                                  </tr>
                                )}
                                {route.dosage.childMarkdownRemark.frontmatter.strong && (
                                  <tr>
                                    <td>Alta</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.strong}</td>
                                  </tr>
                                )}
                                {route.dosage.childMarkdownRemark.frontmatter.heavy && (
                                  <tr>
                                    <td>Pesada</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.heavy}</td>
                                  </tr>
                                )}
                                {route.dosage.childMarkdownRemark.frontmatter.afterEffects && (
                                  <tr>
                                    <td>Efeitos posteriores</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.afterEffects}</td>
                                  </tr>
                                )}
                                {route.dosage.childMarkdownRemark.frontmatter.hangover && (
                                  <tr>
                                    <td>Ressaca</td>
                                    <td className="text-right">{route.dosage.childMarkdownRemark.frontmatter.hangover}</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {route.duration && (
                          <div>
                            <h6 className="text-center text-uppercase"><strong>Duração</strong></h6>
                            <table className="table">
                              <thead>
                                <td><strong>Período</strong></td>
                                <td className="text-right"><strong>Tempo</strong></td>
                              </thead>
                              <tbody>
                                {route.duration.childMarkdownRemark.frontmatter.total && (
                                  <tr>
                                    <td>Total</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.total}</td>
                                  </tr>
                                )}
                                {route.duration.childMarkdownRemark.frontmatter.onset && (
                                  <tr>
                                    <td>Início</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.onset}</td>
                                  </tr>
                                )}
                                {route.duration.childMarkdownRemark.frontmatter.comeup && (
                                  <tr>
                                    <td>Primeiras sensações</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.comeup}</td>
                                  </tr>
                                )}
                                {route.duration.childMarkdownRemark.frontmatter.peak && (
                                  <tr>
                                    <td>Pico</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.peak}</td>
                                  </tr>
                                )}
                                {route.duration.childMarkdownRemark.frontmatter.offset && (
                                  <tr>
                                    <td>Diminuição</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.offset}</td>
                                  </tr>
                                )}
                                {route.duration.childMarkdownRemark.frontmatter.afterEffects && (
                                  <tr>
                                    <td>Efeitos posteriores</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.afterEffects}</td>
                                  </tr>
                                )}
                                {route.duration.childMarkdownRemark.frontmatter.hangover && (
                                  <tr>
                                    <td>Ressaca</td>
                                    <td className="text-right">{route.duration.childMarkdownRemark.frontmatter.hangover}</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </Collapse>
                  </div>
                ))}
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
  location: PropTypes.object,
}

export default Drug
