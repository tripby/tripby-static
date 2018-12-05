import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import qs from 'qs'
import Markdown from 'react-markdown'
import * as Icon from 'react-feather'
import { Collapse } from 'reactstrap'

import Alert from '../components/Alert'
import Ad from '../components/Ad'
import Layout from '../Layout'
import RateDrug from '../components/RateDrug';

const tabStyle = {
  color: '#ee6e73',
  borderColor: '#ee6e73',
  borderWidth: 2,
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

const defaultTabs = [
  { id: 'overview', label: 'Sumário' },
  { id: 'effects', label: 'Efeitos' },
  { id: 'health', label: 'Saúde' },
  { id: 'law', label: 'Lei' },
]

class Drug extends Component {
  state = {}
  getDefaultIndex = () => {
    const { location } = this.props
    let index = 0
    if (location.search) {
      const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true })
      const tabIndex = defaultTabs.findIndex((t) => t.id === tab)
      if (tabIndex >= 0) {
        index = tabIndex
      }
    }
    return index
  }
  handleRouteCollapse(route) {
    if (this.state.activeRoute === route.name) {
      this.setState({ activeRoute: null })
    } else if (route.duration || route.dosage) {
      this.setState({ activeRoute: route.name })
    }
  }
  mapTabs() {
    const { drug } = this.props.pageContext
    return defaultTabs.map((tab) => (
      <Tab
        style={tabStyle}
        className="px-3 py-2 text-uppercase text-center flex-1 cursor-pointer"
        key={tab.id}
      >
        {tab.label}
      </Tab>
    ))
  }
  updatePath = (index) => {
    const tabId = defaultTabs[index].id
    const { navigate, location } = this.props
    navigate(`${location.pathname}?tab=${tabId}`)
  }
  render() {
    const { drug, adImage } = this.props.pageContext
    return (
      <Layout>
        <div>
          <Helmet
            title={`${
              drug.name
            } · efeitos, duração, dosagem, saúde e lei · TRIPBY`}
          >
            <meta
              name="description"
              content={`Entenda melhor sobre ${
                drug.name
              } e como usar de forma segura. ${
                drug.name
              } é ${drug.class.toLowerCase()} e também é conhecido como ${drug.aliases.join(', ')}.`}
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
                    {drug.molecules.map((molecule) => (
                      <img
                        style={{ maxWidth: 96 }}
                        alt={`Molécula ${molecule}`}
                        key={molecule}
                        src={require(`../assets/images/molecules/${molecule}.svg`)} //eslint-disable-line
                      />
                    ))}
                  </div>
                  <p className="text-uppercase text-pinkLight">
                    <strong>{drug.class}</strong>
                  </p>
                  <div className="mb-3">
                    <RateDrug drugId={drug.id} />
                  </div>
                  <div className="mb-3">
                    <h6 className="text-uppercase text-muted">Nomes comuns</h6>
                    {drug.aliases.join(', ')}
                  </div>
                  <h6 className="text-uppercase text-muted">
                    Rotas de administração
                  </h6>
                  {drug.routes.map((route) => (
                    <div className="card border-0 my-1" key={route.name}>
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
                            {route.dosage && <small>dosagem</small>}
                            {route.dosage &&
                              route.duration && (
                              <small className="mx-1">/</small>
                            )}
                            {route.duration && <small>duração</small>}
                          </div>
                          {this.state.activeRoute === route.name ? (
                            <Icon.ChevronUp />
                          ) : (
                            (route.duration || route.dosage) && (
                              <Icon.ChevronDown />
                            )
                          )}
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
                                  <tr>
                                    <th>
                                      <strong>Nível</strong>
                                    </th>
                                    <th className="text-right">
                                      <strong>Dose</strong>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {route.dosage.childMarkdownRemark.frontmatter
                                    .threshold && (
                                    <tr>
                                      <td>Mínimo</td>
                                      <td className="text-right">
                                        {
                                          route.dosage.childMarkdownRemark
                                            .frontmatter.threshold
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.dosage.childMarkdownRemark.frontmatter
                                    .light && (
                                    <tr>
                                      <td>Leve</td>
                                      <td className="text-right">
                                        {
                                          route.dosage.childMarkdownRemark
                                            .frontmatter.light
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.dosage.childMarkdownRemark.frontmatter
                                    .common && (
                                    <tr>
                                      <td>Comum</td>
                                      <td className="text-right">
                                        {
                                          route.dosage.childMarkdownRemark
                                            .frontmatter.common
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.dosage.childMarkdownRemark.frontmatter
                                    .strong && (
                                    <tr>
                                      <td>Alta</td>
                                      <td className="text-right">
                                        {
                                          route.dosage.childMarkdownRemark
                                            .frontmatter.strong
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.dosage.childMarkdownRemark.frontmatter
                                    .heavy && (
                                    <tr>
                                      <td>Pesada</td>
                                      <td className="text-right">
                                        {
                                          route.dosage.childMarkdownRemark
                                            .frontmatter.heavy
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.dosage.childMarkdownRemark.frontmatter
                                    .overdose && (
                                    <tr>
                                      <td>Overdose</td>
                                      <td className="text-right">
                                        {
                                          route.dosage.childMarkdownRemark
                                            .frontmatter.overdose
                                        }
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}
                          {route.duration && (
                            <div>
                              <h6 className="text-center text-uppercase">
                                <strong>Duração</strong>
                              </h6>
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>
                                      <strong>Período</strong>
                                    </th>
                                    <th className="text-right">
                                      <strong>Tempo</strong>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.total && (
                                    <tr>
                                      <td>Total</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.total
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.onset && (
                                    <tr>
                                      <td>Início</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.onset
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.comeup && (
                                    <tr>
                                      <td>Primeiras sensações</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.comeup
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.peak && (
                                    <tr>
                                      <td>Pico</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.peak
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.offset && (
                                    <tr>
                                      <td>Diminuição</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.offset
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.afterEffects && (
                                    <tr>
                                      <td>Efeitos posteriores</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.afterEffects
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {route.duration.childMarkdownRemark
                                    .frontmatter.hangover && (
                                    <tr>
                                      <td>Ressaca</td>
                                      <td className="text-right">
                                        {
                                          route.duration.childMarkdownRemark
                                            .frontmatter.hangover
                                        }
                                      </td>
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
                  <Ad className="mt-3" sizes={adImage.sizes}>
                    <h5 className="text-white">
                      <strong>Contribua com o TRIPBY e leve uma arte 😉</strong>
                    </h5>
                  </Ad>
                </div>
                <div className="col-12 col-lg-8 mt-3">
                  <div className="card" style={{ borderRadius: '4px' }}>
                    <Tabs
                      selectedTabClassName="border-bottom"
                      onSelect={this.updatePath}
                      defaultIndex={this.getDefaultIndex()}
                    >
                      <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                        <div style={{ minWidth: 360, margin: '0 auto' }}>
                          <TabList className="m-0 list-unstyled d-flex align-items-center justify-content-between">
                            {this.mapTabs()}
                          </TabList>
                        </div>
                      </div>
                      <div className="card-body">
                        <TabPanel>
                          <Markdown
                            source={
                              drug.summary.childMarkdownRemark.internal.content
                            }
                          />
                        </TabPanel>
                        <TabPanel>
                          <Alert icon="Info" type="info">
                            Os efeitos listados abaixo raramente (ou nunca)
                            ocorrerão de uma só vez, mas doses maiores
                            aumentarão as chances e são mais propensas a induzir
                            uma gama completa de efeitos.
                          </Alert>
                          <Markdown
                            source={
                              drug.effects.childMarkdownRemark.internal.content
                            }
                          />
                        </TabPanel>
                        <TabPanel>
                          <Markdown
                            source={
                              drug.health.childMarkdownRemark.internal.content
                            }
                          />
                        </TabPanel>
                        <TabPanel>
                          <Markdown
                            source={
                              drug.law.childMarkdownRemark.internal.content
                            }
                          />
                        </TabPanel>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

Drug.propTypes = {
  pageContext: PropTypes.object,
  location: PropTypes.object,
}

export default Drug
