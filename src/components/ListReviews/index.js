import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Flex, Box } from 'rebass'
import Markdown from 'react-markdown'

import { GET_DRUG_REVIEWS } from './queries'
import Stars from '../RateDrug/Stars'

const ListReviews = ({ data }) => {
  const reviews = data.allReviews
  if (data.loading) {
    return <h6 className="text-center text-muted">carregando reviews</h6>
  } else if (reviews && reviews.length > 0) {
    return (
      <Fragment>
        <Flex flexDirection="column" my={-2}>
          {reviews.map((review, index) => {
            const userId = review.user.id
            const shortUserId = userId.slice(userId.length - 8, userId.length)
            const isLast = index === reviews.length - 1
            return (
              <Box>
                <Box my={2} key={review.id}>
                  <h6 className="text-muted mb-1">{shortUserId}</h6>
                  <Stars size={16} readonly initialRating={review.rating} />
                  {review.message && (
                    <Box mt={2}>
                      <Markdown>{review.message}</Markdown>
                    </Box>
                  )}
                </Box>
                {!isLast && <hr />}
              </Box>
            )
          })}
        </Flex>
      </Fragment>
    )
  } else if (reviews && reviews.length === 0) {
    return <h5>Ainda não há reviews para esta substância 😿</h5>
  }
  return null
}

ListReviews.propTypes = {}

export default graphql(GET_DRUG_REVIEWS, {
  options: ({ drugId }) => ({
    variables: {
      drugId,
    },
  }),
})(ListReviews)
