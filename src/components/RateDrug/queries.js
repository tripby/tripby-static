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

export const UPDATE_DRUG_REVIEW = gql`
  mutation updateDrugReview(
    $id: ID!
    $rating: Int
    $drugId: ID
    $userId: ID
    $message: String
  ) {
    updateReview(
      id: $id
      rating: $rating
      drugId: $drugId
      userId: $userId
      message: $message
    ) {
      id
    }
  }
`

export const GET_USER_RATING_ON_DRUG = gql`
  query getUserReviewOnDrug(
    $filter: ReviewFilter
    $orderBy: ReviewOrderBy
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    allReviews(
      filter: $filter
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      id
      message
      rating
      user {
        id
      }
    }
  }
`
