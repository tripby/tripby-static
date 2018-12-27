import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { Flex } from 'rebass'
import { Location } from '@reach/router'

import { auth as auth0, login } from '../Auth0'

import { GET_DRUG_REVIEW_COUNT_BY_RATING, CREATE_DRUG_REVIEW } from './queries'
import Stars from './Stars'
import Modal from '../Modal'
import Messages from './Messages'
import ModalContent from './ModalContent'

const getCounts = (scores) => {
  const keys = Object.keys(scores)
  const values = Object.values(scores)
  const total = values.reduce((acc, val) => acc + val)
  const sum = values.reduce((acc, val, idx) => acc + val * keys[idx])
  return {
    average: sum / total,
    total,
  }
}

class RateDrug extends Component {
  state = {
    isModalOpen: false,
    isAuthAlertShown: false,
    hasUserRated: false,
  }
  toggleModal = () => {
    this.setState((state) => ({
      isModalOpen: !state.isModalOpen,
    }))
  }
  toggleAuthAlert = () => {
    this.setState(
      {
        isAuthAlertShown: true,
      },
      () => {
        setTimeout(
          () =>
            this.setState({
              isAuthAlertShown: false,
            }),
          5000
        )
      }
    )
  }
  onRatingError = (error) => {}
  render() {
    const { data, auth, drugId } = this.props
    const userId = auth.id
    const { isAuthAlertShown, isModalOpen, hasUserRated } = this.state
    const isAuthenticated = !!auth.id
    const initialRating = data && data.counts && data.counts.average
    const reviewCount = data && data.counts && data.counts.total
    const isLoading = data.loading
    return (
      <div>
        <Flex alignItems="center">
          <Modal isOpen={isModalOpen} toggleModal={this.toggleModal}>
            <ModalContent
              userId={userId}
              drugId={drugId}
              toggleModal={this.toggleModal}
            />
          </Modal>
          <Mutation
            mutation={CREATE_DRUG_REVIEW}
            onCompleted={this.toggleModal}
            onError={this.onRatingError}
            refetchQueries={() => [
              {
                query: GET_DRUG_REVIEW_COUNT_BY_RATING,
                variables: {
                  drugFilter: {
                    id: drugId,
                  },
                },
              },
            ]}
          >
            {(createDrugReview, { loading }) => (
              <Location>
                {({ location }) => (
                  <Stars
                    onClick={(rating) => {
                      if (isAuthenticated) {
                        createDrugReview({
                          variables: { rating, drugId, userId },
                        })
                      } else {
                        login(location.pathname)
                      }
                    }}
                    // quiet={!isAuthenticated || loading}
                    readOnly={!isAuthenticated || loading}
                    isLoading={data.loading}
                    initialRating={data && data.counts && data.counts.average}
                  />
                )}
              </Location>
            )}
          </Mutation>
          <Messages
            ml={2}
            isLoading={isLoading}
            initialRating={initialRating}
            reviewCount={reviewCount}
            isAuthAlertShown={isAuthAlertShown}
            hasUserRated={hasUserRated}
          />
        </Flex>
      </div>
    )
  }
}

RateDrug.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default graphql(GET_DRUG_REVIEW_COUNT_BY_RATING, {
  options: ({ drugId }) => ({
    variables: {
      drugFilter: {
        id: drugId,
      },
    },
  }),
  props: ({ data, ownProps }) => ({
    ...ownProps,
    data: {
      ...data,
      counts:
        !data.loading && data.networkStatus === 7
          ? getCounts({
            1: data.one.count,
            2: data.two.count,
            3: data.three.count,
            4: data.four.count,
            5: data.five.count,
          })
          : null,
    },
  }),
})(connect(
  mapStateToProps,
  null
)(RateDrug))
