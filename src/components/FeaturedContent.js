/**
 *
 * FeaturedContent
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

function FeaturedContent(props) {
  return (
    <section className="bg-purpleHeart text-screaminGreen">
      <div className="container">
        <div className="py-4 py-md-5 d-flex flex-column justify-content-center">
          <h1 className="text-uppercase mb-0">
            <strong>{props.tagline}</strong>
          </h1>
          {props.children}
        </div>
      </div>
    </section>
  )
}

FeaturedContent.propTypes = {
  children: PropTypes.node,
  tagline: PropTypes.string,
}

export default FeaturedContent
