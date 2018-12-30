import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { navigate } from '@reach/router'

import auth0 from './auth0'
import { GET_USER } from './queries'
import { apolloClient } from '../../../wrap-with-provider'
import { domain } from '../../constants'

const AuthContext = React.createContext({})

let userId = null
let token = null
let tokenExpires = Infinity
let location = null
let returnTo = null

const now = new Date()

if (typeof localStorage !== 'undefined') {
  userId = localStorage.getItem('userId')
  token = localStorage.getItem('token')
  tokenExpires = localStorage.getItem('tokenExpires')
  returnTo = localStorage.getItem('returnTo')
}

if (typeof window !== 'undefined') {
  ({ location } = window)
}

export default class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = {
    user: null,
    token: null,
    setUser: this.setUser,
  }
  setUser = (user) => {
    this.setState({ user })
  }
  setToken = (token) => {
    this.setState({ token })
  }
  login = () => {
    let pathname = '/'
    if (typeof window !== 'undefined') {
      ({ pathname } = window.location)
    }
    localStorage.setItem('returnTo', pathname)
    auth0.authorize()
  }
  clearLocalStorage = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpires')
  }
  logout = () => {
    this.setUser(null)
    this.setToken(null)
    this.clearLocalStorage()
    auth0.logout({ returnTo: domain })
  }
  componentDidMount() {
    if (tokenExpires && Date.parse(now) > tokenExpires) {
      this.clearLocalStorage()
    } else if (
      location &&
      (location.pathname === '/authorize' ||
        location.pathname === '/authorize/')
    ) {
      this.parseHash()
    } else if (userId && token) {
      this.setToken(token)
      this.getUser(userId)
    }
  }
  getUser = (_userId) => {
    apolloClient
      .query({
        query: GET_USER,
        variables: {
          userId: _userId,
        },
      })
      .then((res) => {
        const user = res.data.User
        this.setUser(user)
      })
  }
  parseHash = () => {
    if (location && location.hash) {
      auth0.parseHash({ hash: location.hash }, (err, authResult) => {
        if (err) {
          this.setState({ err })
        }
        const _token = authResult.idToken
        const _tokenExpires = Date.parse(now.setSeconds(now.getSeconds() + authResult.expiresIn))
        const _userId = authResult.idTokenPayload.user_id
        localStorage.setItem('token', _token)
        localStorage.setItem('tokenExpires', _tokenExpires)
        localStorage.setItem('userId', _userId)
        this.getUser(_userId)
        this.setToken(_token)
        if (returnTo) {
          navigate(returnTo)
        }
      })
    }
  }
  render() {
    const {
      user, setUser, token, setToken,
    } = this.state
    const { login, logout } = this
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          setUser,
          setToken,
          login,
          logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const AuthConsumer = ({ children }) => (
  <AuthContext.Consumer>{(value) => children(value)}</AuthContext.Consumer>
)

AuthConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}
