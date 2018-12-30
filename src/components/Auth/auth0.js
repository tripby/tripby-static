import auth from 'auth0-js'
import { domain } from '../../constants'

const auth0 = new auth.WebAuth({
  domain: 'tripby.auth0.com',
  clientID: 'dxItVoNZ8RL7g_SC26qXKLJzlgywHPYp',
  redirectUri: `${domain}/authorize`,
  responseType: 'token id_token',
  scope: 'openid profile email',
})

export default auth0
