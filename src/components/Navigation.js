/**
 *
 * Navigation
 *
 */

import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import * as Icon from 'react-feather'

import Hamburger from './Hamburger'
import SocialMedia from './SocialMedia'
import { AuthConsumer } from './Auth'
import User from './Auth/User'

const logo = require('../assets/images/logo.svg')

const items = [
  {
    label: 'Psicoativos',
    link: '/psicoativos',
    icon: 'Loader',
  },
  {
    label: 'Redução de danos',
    link: '/artigos',
    icon: 'Book',
  },
  {
    label: 'Shop',
    link: '/shop',
    icon: 'ShoppingBag',
  },
  {
    label: 'Sobre',
    link: '/sobre',
    icon: 'Info',
  },
]

class Navigation extends React.Component {
  constructor() {
    super()
    this.handleNav = this.handleNav.bind(this)
    this.state = {
      navOpened: false,
    }
  }
  handleNav() {
    this.setState({
      navOpened: !this.state.navOpened,
    })
  }
  render() {
    const navClasses = classnames({
      'd-none': !this.state.navOpened,
      'd-md-block': true,
    })
    return (
      <div className="header py-3 py-md-4">
        <div className="container h-100">
          <div className="d-flex flex-column h-100">
            <div className="flex-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-0 mb-md-5">
                  <Link to="/">
                    <img src={logo} alt="TRIPBY" className="logo" />
                  </Link>
                </div>
                <div className="d-inline-flex">
                  {/* <Link to="/search">
                  <div className="d-md-none text-uppercase mr-2">
                    <Icon.Search size={24} />
                  </div>
                </Link> */}
                  <span className="d-md-none">
                    <Hamburger
                      onClick={this.handleNav}
                      navOpened={this.state.navOpened}
                    />
                  </span>
                </div>
              </div>
              <nav className={navClasses}>
                <ul className="nav flex-column">
                  {items.map((item) => {
                    const ParsedIcon = Icon[item.icon]
                    return (
                      <li key={item.link}>
                        <Link
                          to={item.link}
                          onClick={() => this.setState({ navOpened: false })}
                        >
                          <div className="d-flex align-items-center">
                            <span className="mr-2 d-inline-flex align-items-center">
                              <ParsedIcon size={24} />
                            </span>
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                  <li>
                    <AuthConsumer>
                      {({ user, logout, login }) => {
                        if (user) {
                          return <User logout={logout} userId={user.id} />
                        }
                        return (
                          <a
                            href="#!"
                            className="d-flex align-items-center"
                            onClick={login}
                          >
                            <span className="d-inline-flex mr-2">
                              <Icon.LogIn size={24} />
                            </span>
                            <span>Login</span>
                          </a>
                        )
                      }}
                    </AuthConsumer>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="d-none d-md-block">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Navigation.propTypes = {}

export default Navigation
