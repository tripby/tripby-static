/**
*
* ArticleCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const ArticleCard = ({ article }) => (
  <Link to={article.frontmatter.path} className="card card--shadow" style={{ marginBottom: '1rem' }}>
    <div className="card-body">
      <h4 className="text-blue text-hover">
        {article.frontmatter.title}
      </h4>
      <p>{article.excerpt}</p>
    </div>
  </Link>
)

ArticleCard.propTypes = {
  article: PropTypes.object,
}

export default ArticleCard
