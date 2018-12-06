import React from 'react'
import { Provider } from 'react-redux'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

import createStore from './src/store/createStore'
import { apiUrl } from './src/constants'

export const apolloClient = new ApolloClient({
  uri: apiUrl,
  fetch,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  request: async (operation) => {
    const token = await localStorage.getItem('token')
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
})

const store = createStore()

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
  </Provider>
)
