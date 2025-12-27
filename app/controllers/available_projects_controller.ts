import Projects from '#models/projects'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AvailableProjectsController {
  public async projects({ auth, inertia }: HttpContext) {
    try {
      const { organization_id, id } = auth.user as User
      const projects = await Projects.query()
        .where('organization_id', organization_id)
        .whereHas('members', (memberQuery) => {
          memberQuery.where('user_id', id)
        })
        .preload('members')
      return inertia.render('availableProjects', {
        projects,
      })
    } catch (error) {
      console.log('Get ALl projects Error', error)
    }
  }
}
