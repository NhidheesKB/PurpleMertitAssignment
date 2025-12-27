import Projects from '#models/projects'
import { updateProjectValidator } from '#validators/validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateprojectsController {
  public async update({ request, response }: HttpContext) {
    try {
      const { project_id, updateData } = await request.validateUsing(updateProjectValidator)

      await Projects.query().where('id', project_id).update(updateData)
      return response.ok('Update Sucessfully')
    } catch (error) {
      console.error('UpdateProjectError', error)
      return response.status(500).send('Internal Server Error')
    }
  }
}
