import gql from 'graphql-tag'

export const GET_DRUG_REVIEW_COUNT_BY_RATING = gql`
  query reviewCountByRating($drugFilter: DrugFilter!) {
    one: _allReviewsMeta(filter: { rating: 1, drug: $drugFilter }) {
      count
    }
    two: _allReviewsMeta(filter: { rating: 2, drug: $drugFilter }) {
      count
    }
    three: _allReviewsMeta(filter: { rating: 3, drug: $drugFilter }) {
      count
    }
    four: _allReviewsMeta(filter: { rating: 4, drug: $drugFilter }) {
      count
    }
    five: _allReviewsMeta(filter: { rating: 5, drug: $drugFilter }) {
      count
    }
  }
`

export const CREATE_DRUG_REVIEW = gql`
  mutation createDrugReview(
    $message: String
    $rating: Int!
    $drugId: ID
    $drug: ReviewdrugDrug
    $userId: ID
  ) {
    createReview(
      message: $message
      rating: $rating
      drugId: $drugId
      drug: $drug
      userId: $userId
    ) {
      id
    }
  }
`
