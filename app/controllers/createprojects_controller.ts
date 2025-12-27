import ProjectMember from '#models/project_member'
import Projects from '#models/projects'
import Workspace from '#models/workspace'
import { createProjectValidator } from '#validators/validator'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CreateprojectsController {
  /**
   * @create
   * @requestBody <createProjectValidator>
   */
  public async create({ request, response, auth }: HttpContext) {
    const trx = await db.transaction()

    try {
      const { name, description, role, user } = await request.validateUsing(createProjectValidator)
      console.log('name', role, user)
      const created_by = auth.user?.id
      const organization_id = auth.user?.organization_id
      const Projectbody = {
        organization_id,
        created_by,
        name,
        description,
      }
      const project = await Projects.create(
        {
          organization_id,
          created_by,
          name,
          description,
        },
        { client: trx }
      )

      await ProjectMember.create(
        {
          project_id: project.id,
          user_id: user,
          role_id: role,
        },
        { client: trx }
      )

      await Workspace.create(
        {
          project_id: project.id,
          name: `${name} Workspace`,
        },
        { client: trx }
      )

      await trx.commit()

      return response.ok('Project Created Sucessfully')
    } catch (error) {
      await trx.rollback()
      console.error('CreateProjectError', error)
      return response.status(500).send('Internal Server Error')
    }
  }
}
