import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Rating from 'react-rating'
import { Flex, Box } from 'rebass'

import { Star as StarIcon } from 'react-feather'
import { colors } from '../../constants'

const Star = (props) => <StarIcon color={colors.grey} size={24} {...props} />

const FullStar = styled(Star).attrs({
  color: colors.blue,
})`
  fill: ${colors.blue};
`

const Stars = ({ total, isLoading, ...props }) => (
  <Rating emptySymbol={<Star />} fullSymbol={<FullStar />} {...props} />
)

Stars.propTypes = {
  initialRating: PropTypes.number.isRequired,
}

export default Stars
