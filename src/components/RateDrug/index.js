import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, Mutation } from 'react-apollo'
import { connect } from 'react-redux'

import { GET_DRUG_REVIEW_COUNT_BY_RATING, CREATE_DRUG_REVIEW } from './queries'
import Stars from './Stars'
import Modal from './Modal'

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
  onRatingCompleted = (data) => {
    console.log(data)
  }
  render() {
    const { data, auth, drugId } = this.props
    const userId = auth.id
    const { isAuthAlertShown, isModalOpen } = this.state
    const isAuthenticated = !!auth.id
    return (
      <div>
        <Mutation
          mutation={CREATE_DRUG_REVIEW}
          onCompleted={this.onRatingCompleted}
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
            <Stars
              onHover={!isAuthenticated ? this.toggleAuthAlert : () => null}
              onClick={(rating) => {
                createDrugReview({ variables: { rating, drugId, userId } })
              }}
              quiet={!isAuthenticated || loading}
              readOnly={!isAuthenticated || loading}
              isLoading={data.loading}
              initialRating={data && data.counts && data.counts.average}
              total={data && data.counts && data.counts.total}
            />
          )}
        </Mutation>
        {isAuthAlertShown && 'Você precisa estar logado para votar'}
        <Modal toggleModal={this.toggleModal} isOpen={isModalOpen} />
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
