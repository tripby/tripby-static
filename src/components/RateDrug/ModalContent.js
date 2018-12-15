import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import { Mutation, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'

import Stars from './Stars'
import {
  CREATE_DRUG_REVIEW,
  GET_USER_RATING_ON_DRUG,
  UPDATE_DRUG_REVIEW,
} from './queries'

const Wrapper = styled.div`
  text-align: center;
`

const onSubmit = (e, review, submit) => {
  e.preventDefault()
  const { value: message } = e.target.message
  submit({ variables: { message, id: review.id, userId: review.user.id } })
}

const ModalContent = ({ data, toggleModal }) => {
  const userReview =
    data.allReviews && data.allReviews.length > 0 && data.allReviews[0]
  return (
    <Wrapper>
      <Mutation
        mutation={UPDATE_DRUG_REVIEW}
        onCompleted={() => setTimeout(() => toggleModal(), 3000)}
      >
        {(updateReview, { loading, data }) => {
          if (data && data.updateReview && data.updateReview.id) {
            return (
              <Box py={3}>
                <h3>Você é fera demais 😎</h3>
              </Box>
            )
          }
          return (
            <Fragment>
              <Box py={3}>
                <Stars
                  size={32}
                  initialRating={userReview && userReview.rating}
                  quiet
                  readonly
                />
              </Box>
              <h3>✨ Valeu por avaliar!</h3>
              <p className="lead">
                Quer contar mais sobre como foi a experiência?
              </p>
              <form onSubmit={(e) => onSubmit(e, userReview, updateReview)}>
                <Input type="textarea" name="message" rows="8" required />
                <Box py={2}>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Enviando' : 'Enviar'}
                  </button>
                </Box>
              </form>
              <a href="#!" onClick={toggleModal}>
                Fechar
              </a>
            </Fragment>
          )
        }}
      </Mutation>
    </Wrapper>
  )
}

export default graphql(GET_USER_RATING_ON_DRUG, {
  options: ({ userId, drugId }) => ({
    variables: {
      last: 1,
      filter: {
        AND: [
          {
            user: {
              id: userId,
            },
          },
          {
            drug: {
              id: drugId,
            },
          },
        ],
      },
    },
  }),
})(ModalContent)
