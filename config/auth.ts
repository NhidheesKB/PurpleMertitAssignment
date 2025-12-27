import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { tokensUserProvider } from '@adonisjs/auth/access_tokens'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import { JwtGuardUser, BaseJwtContent } from '@maximemrf/adonisjs-jwt/types'
import User from '#models/user'
import env from '#start/env'
import { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'

interface JwtContent extends BaseJwtContent {
  email: string
}

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
    jwt: jwtGuard({
      tokenName: 'purpleMetrit-token',
      tokenExpiresIn: '1h',
      useCookies: true,
      secret: env.get('JWT_SECRET'),
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
      refreshTokenUserProvider: tokensUserProvider({
        tokens: 'refreshTokens',
        model: () => import('#models/user'),
      }),
      content: <T>(user: JwtGuardUser<T>): JwtContent => {
        return {
          userId: user.getId(),
          email: (user.getOriginal() as User).email,
        }
      },
    }),
  },
})
export default authConfig
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
