/**
*
* DrugCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'

const DrugCard = ({ drug }) => (
  <Link to={drug.path} className="card card--shadow" style={{ marginBottom: '1rem' }}>
    <div className="card-body">
      <div className="row">
        <div className="col-8">
          <h3 className="text-blue text-hover">
            {drug.name}
          </h3>
          <p className="mb-0 text-pink text-uppercase">
            {drug.class}
          </p>
        </div>
        <div className="col-4 d-flex align-items-center">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img
              alt={`Molécula ${drug.molecules[0]}`}
              src={require(`../assets/images/molecules/${drug.molecules[0]}.svg`)} // eslint-disable-line
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: 56,
              }}
            />
          </div>
        </div>
        <div className="col-12">
          {drug.aliases && drug.aliases.length > 0 ?
            <span>
              <small className="text-muted">
                ({drug.aliases.join(', ')})
              </small>
            </span> : null}
          {drug.summary ? (
            <Markdown>
              {drug.summary}
            </Markdown>
          ) : null}
        </div>
      </div>
    </div>
  </Link>
)

DrugCard.propTypes = {
  drug: PropTypes.object,
}

export default DrugCard
