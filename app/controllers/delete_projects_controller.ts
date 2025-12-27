import Projects from '#models/projects'
import { DeleteProjectValidator } from '#validators/validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteProjectsController {
   /**
   * @handledelete
   * @requestBody <DeleteProjectValidator>
   */
  public async handledelete({ request, response }: HttpContext) {
    try {
      const { project_id } = await request.validateUsing(DeleteProjectValidator)
      await Projects.query().where('id', project_id).delete()
      return response.ok('Project Deleted Sucessfully')
    } catch (error) {
      return response.status(500).send('Internal Server Error')
    }
  }
}
