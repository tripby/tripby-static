import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navigation from '../components/Navigation'
import SocialMedia from '../components/SocialMedia'
import '../assets/styles/main.scss'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title="TRIPBY · Leia a bula"
    >
      <meta name="description" content="Entenda os efeitos, duração e dosagem das drogas psicoativas mais comuns. Use com consciência, pratique a redução de danos." />
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no, shrink-to-fit=no" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <div className="row flex-column flex-md-row no-gutters justify-content-stretch" style={{ minHeight: '100vh' }}>
      <div className="col-12 col-md-3 col-lg-2">
        <Navigation />
      </div>
      <div className="col-12 col-md-9 col-lg-10 d-flex flex-column bg-greyLighter" style={{ flex: 1 }}>
        <div style={{ flex: 1 }} className="d-flex flex-column">
          {children()}
        </div>
      </div>
    </div>
    <div className="d-md-none py-3">
      <div className="container">
        <SocialMedia />
      </div>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
