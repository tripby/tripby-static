import gql from 'graphql-tag'

export const GET_USER = gql`
  query checkUser($userId: String) {
    User(auth0UserId: $userId) {
      id
      role
    }
  }
`
