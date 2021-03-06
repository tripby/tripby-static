/**
 *
 * Auth0
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import auth0 from 'auth0-js'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import * as Icon from 'react-feather'

import setUser from './actions'
import Identicon from '../Identicon'

export const auth = new auth0.WebAuth({
  domain: 'tripby.auth0.com',
  clientID: 'dxItVoNZ8RL7g_SC26qXKLJzlgywHPYp',
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.GATSBY_DOMAIN}/authorize`
      : 'http://localhost:8000/authorize',
  responseType: 'token id_token',
  scope: 'openid profile email',
})

export const login = (pathname) => {
  localStorage.setItem('pathname', pathname)
  auth.authorize()
}

class Auth0 extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
  }
  componentDidMount() {
    const now = Date.parse(new Date())
    if (
      localStorage.getItem('tokenExpires') &&
      now > localStorage.getItem('tokenExpires')
    ) {
      this.logout()
    } else if (
      (this.props.location.pathname === '/authorize' ||
        this.props.location.pathname === '/authorize/') &&
      this.props.location.hash
    ) {
      this.parseHash()
    } else if (localStorage.getItem('userId')) {
      this.checkUser(localStorage.getItem('userId'))
    }
  }
  componentDidUpdate(prevProps) {
    const user = this.props.data.User
    if (user && prevProps.data.User !== user && user.id) {
      this.props.dispatch(setUser(user))
    }
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpires')
    localStorage.removeItem('userId')
    this.setState({})
    this.props.dispatch(setUser({ id: null, role: null }))
  }
  createUser(idToken, email) {
    this.props.mutate({
      variables: {
        idToken,
        email,
      },
    })
  }
  checkUser(userId) {
    this.props.data
      .refetch({
        userId,
      })
      .then((response) => {
        if (!response.data.User) {
          this.createUser(
            this.state.authResult.idToken,
            this.state.authResult.idTokenPayload.email
          )
        } else {
          this.props.data.updateQuery({ variables: { userId } })
        }
      })
      .then(() => {
        if (localStorage.getItem('pathname')) {
          const { navigate } = this.props
          navigate(localStorage.getItem('pathname'))
          localStorage.removeItem('pathname')
        }
      })
  }
  parseHash() {
    auth.parseHash(
      {
        hash: this.props.location.hash,
      },
      (err, authResult) => {
        if (err) {
          this.setState({
            err,
          })
        }
        const now = new Date()
        localStorage.setItem('token', authResult.idToken)
        localStorage.setItem(
          'tokenExpires',
          now.setSeconds(now.getSeconds() + authResult.expiresIn)
        )
        localStorage.setItem('userId', authResult.idTokenPayload.user_id)
        this.setState(
          {
            authResult,
          },
          () => {
            this.checkUser(authResult.idTokenPayload.user_id)
          }
        )
      }
    )
  }
  render() {
    const userId = this.props.data.User && this.props.data.User.id
    const shortUserId = userId && userId.slice(userId.length - 8, userId.length)
    return (
      <div>
        {!this.props.data.User || !localStorage.getItem('token') ? (
          <a href="#!" onClick={() => login(this.props.location.pathname)}>
            {this.props.data.loading ? (
              '...'
            ) : (
              <div className="d-flex align-items-center">
                <span className="d-inline-flex mr-2">
                  <Icon.LogIn size={24} />
                </span>
                <span>Entrar</span>
              </div>
            )}
          </a>
        ) : (
          <div>
            <div className="d-inline-flex align-items-center mb-1">
              <span className="mr-2">
                <Identicon hash={userId} size={24} />
              </span>
              <small>
                <span className="text-muted">id</span>{' '}
                <strong
                  title="Este é o ID da sua conta"
                  style={{ cursor: 'help' }}
                >
                  {shortUserId}
                </strong>
              </small>
            </div>
            <a
              href="#!"
              className="p-0 small text-muted d-block"
              onClick={() => this.logout()}
            >
              Sair
            </a>
          </div>
        )}
      </div>
    )
  }
}

Auth0.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func,
  dispatch: PropTypes.func,
}

const createUser = gql`
  mutation createUser($idToken: String!, $email: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }, email: $email) {
      id
    }
  }
`

const checkUser = gql`
  query checkUser($userId: String!) {
    User(auth0UserId: $userId) {
      id
      role
    }
  }
`

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default compose(
  graphql(createUser, { options: { refetchQueries: ['checkUser'] } }),
  graphql(checkUser, {
    options: {
      variables: {
        userId:
          typeof localStorage !== 'undefined'
            ? localStorage.getItem('userId')
            : '',
      },
    },
  })
)(connect(
  null,
  mapDispatchToProps
)(Auth0))
