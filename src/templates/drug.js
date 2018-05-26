import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Drug extends Component {
  state = {

  }
  render() {
    const { drug } = this.props.pathContext
    return (
      <section className="py-3 py-md-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <h1><strong>{drug.title}</strong></h1>
              <h6>{drug.class}</h6>
            </div>
            <div className="col-12 col-lg-8 mt-3">

            </div>
          </div>
        </div>
      </section>
    )
  }
}

Drug.propTypes = {
  pathContext: PropTypes.object,
}

export default Drug
