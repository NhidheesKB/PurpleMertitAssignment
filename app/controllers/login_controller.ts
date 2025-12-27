import User from '#models/user'
import { loginValidator } from '#validators/validator'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class LoginController {
  public async handleLogin({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      console.log("email",email,password)
      const user = await User.verifyCredentials(email, password)
      if (user) return (await auth.use('jwt').generate(user),response.redirect().toRoute('projectHandller'))
      return response.redirect().toRoute('login')
    } catch (error) {
      console.error('LoginError', error)
      return response.status(500).send('Internal Server Error')
    }
  }
}
