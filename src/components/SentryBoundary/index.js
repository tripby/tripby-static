import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/browser'

export default class SentryBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = {
    error: null,
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      this.setState({ error })
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key])
        })
        Sentry.captureException(error)
      })
    }
  }

  render() {
    if (this.state.error) {
      return <div>Algo errado aconteceu 😥</div>
    }
    return this.props.children
  }
}
