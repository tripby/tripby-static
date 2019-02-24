import React from 'react'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

import createStore from './src/store/createStore'
import { apiUrl } from './src/constants'
import SentryBoundary from './src/components/SentryBoundary'

Sentry.init({
  dsn: 'https://d840f5a862d149f095855000c80d02d9@sentry.io/1361663',
})

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
  <SentryBoundary>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
    </Provider>
  </SentryBoundary>
)
