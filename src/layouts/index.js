import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navigation from '../components/Navigation'
import '../assets/styles/main.scss'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      meta={{
        name: 'viewport', content: 'initial-scale=1.0, user-scalable=no',
      }}
    />
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
