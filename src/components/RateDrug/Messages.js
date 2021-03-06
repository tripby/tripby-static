import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import styled from 'styled-components'
import { Location } from '@reach/router'

import { login } from '../Auth0'

const Messages = ({
  initialRating,
  reviewCount,
  isAuthAlertShown,
  isLoading,
  hasUserRated,
}) => {
  if (hasUserRated) {
    return (
      <p className="mb-0">
        Obrigado por avaliar!{' '}
        <span role="img" aria-label="balloon">
          🎈
        </span>
      </p>
    )
  } else if (isAuthAlertShown) {
    return (
      <Location>
        {({ location }) => (
          <p className="mb-0">
            <a href="#!" onClick={() => login(location.pathname)}>
              Faça login
            </a>{' '}
            antes{' '}
            <span role="img" aria-label="upside-down face">
              🙃
            </span>
          </p>
        )}
      </Location>
    )
  } else if (initialRating && reviewCount) {
    return (
      <Flex alignItems="center">
        <p className="font-weight-bold mb-0">{initialRating.toFixed(1)}</p>
        <p className="ml-2 mb-0 text-muted">({reviewCount} reviews)</p>
      </Flex>
    )
  } else if (!isLoading) {
    return (
      <p className="mb-0">
        Faça o primeiro review{' '}
        <span role="img" aria-label="sparkles">
          ✨
        </span>
      </p>
    )
  }

  return null
}

const Wrapper = styled(Box)``

const WrappedMessages = ({
  initialRating,
  reviewCount,
  isAuthAlertShown,
  isLoading,
  hasUserRated,
  ...props
}) => (
  <Wrapper {...props}>
    <Messages
      initialRating={initialRating}
      reviewCount={reviewCount}
      isAuthAlertShown={isAuthAlertShown}
      isLoading={isLoading}
      hasUserRated={hasUserRated}
    />
  </Wrapper>
)

Messages.propTypes = {
  initialRating: PropTypes.number,
  reviewCount: PropTypes.number,
  isAuthAlertShown: PropTypes.bool,
}

export default WrappedMessages
