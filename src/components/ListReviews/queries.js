import gql from 'graphql-tag'

export const GET_DRUG_REVIEWS = gql`
  query getDrugReviews($drugId: ID!) {
    allReviews(filter: { drug: { id: $drugId } }) {
      id
      message
      rating
      user {
        id
      }
    }
  }
`
