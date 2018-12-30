import React from 'react'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

import { apiUrl } from './src/constants'
import SentryBoundary from './src/components/SentryBoundary'
import AuthProvider from './src/components/Auth'

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

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <SentryBoundary>
    <AuthProvider>
      <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
    </AuthProvider>
  </SentryBoundary>
)
