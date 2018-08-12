import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'
import * as Icon from 'react-feather'
import Link from 'gatsby-link'

const Card = styled.div`
  background: linear-gradient(135deg, rgba(29,192,220,1) 0%,rgba(0,0,0,1) 64%);
  background: linear-gradient(135deg, #2c5364, #0f2027 64%);
  border-radius: 8px;
  `

const Background = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const currentAdId = 14

export default class Ad extends Component {
  hide() {
    localStorage.setItem(`hideAd${currentAdId}`, true)
    this.forceUpdate()
  }
  render() {
    const { className, children, sizes } = this.props
    if (!localStorage.getItem(`hideAd${currentAdId}`)) {
      return (
        <Card className={`card ${className}`}>
          <Background>
            <Img
              position="absolute"
              sizes={sizes}
              style={{
                width: '480px',
                height: '480px',
                top: '24%',
                left: '36%',
                position: 'absolute',
                right: 0,
              }}
            />
          </Background>
          <div className="card-body">
            <div className="d-flex">
              <div className="flex-1">
                {children}
              </div>
              <Icon.X
                className="text-white position-relative cursor-pointer"
                style={{ zIndex: 2 }}
                size={16}
                onClick={() => this.hide()}
              />
            </div>
            <div
              className="mt-5 d-inline-flex flex-column position-relative"
              style={{
                zIndex: 3,
              }}
            >
              <a
                href=""
                className="btn btn-outline border-green text-white d-inline-flex align-items-center justify-content-center mb-1"
              >
                Shop
                <Icon.ExternalLink size={16} className="ml-2" />
              </a>
              <Link
                to="/shop"
                className="btn text-white d-inline-block"
              >
                Envie a sua
              </Link>
            </div>
          </div>
        </Card>
      )
    }
    return null
  }
}
Ad.propTypes = {
  children: PropTypes.node,
}
