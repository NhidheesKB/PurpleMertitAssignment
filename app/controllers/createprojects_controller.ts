import Projects from '#models/projects'
import { createProjectValidator } from '#validators/validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateprojectsController {
  public async create({ request, response, auth }: HttpContext) {
    try {
      const {  name, description } =
        await request.validateUsing(createProjectValidator)
      const created_by = auth.user?.id
      const organization_id=auth.user?.organization_id
      const body = {
        organization_id,
        created_by,
        name,
        description,
      }
      await Projects.create(body)
      return response.ok('Project Created Sucessfully')
    } catch (error) {
      console.error('CreateProjectError', error)
      return response.status(500).send('Internal Server Error')
    }
  }
}
