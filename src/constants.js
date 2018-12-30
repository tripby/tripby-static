export const domain =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.GATSBY_DOMAIN}`
    : 'http://localhost:8000'

export const apiUrl = 'https://api.graph.cool/simple/v1/tripby'

export const sentryDsn =
  'https://d840f5a862d149f095855000c80d02d9@sentry.io/1361663'

export const colors = {
  blue: '#00adee',
  blueLight: '#4cf',
  blueLighter: '#E0F7FA',
  blueAccent: '#1DC0DC',
  pink: '#ec297b',
  pinkLight: '#f06292',
  pinkLighter: '#F2ACC4',
  green: '#4FFF88',
  grey: ' #9E9E9E',
  greyLight: '#eee',
  greyLighter: '#fafafa',
  greyDark: '#424242',
  greyDarker: '#222',
}
