import Projects from '#models/projects'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'fs/promises'
export default class PojectHandllersController {
  public async handleProject({ request, response, inertia, auth }: HttpContext) {
    const projectid = request.input('projectid')
    try {
      const { organization_id, id } = auth.user as User
      if (!projectid) {
        const users = await User.query().select('fullName','id').where('organization_id',organization_id)
        return inertia.render('home',{users})
      }
      const projectDetails = await Projects.query()
        .where('id', projectid)
        .andWhere('organization_id', organization_id)
        .preload('members', (memberQuery) => memberQuery.where('user_id', id))
        .preload('workspaces')
      const result = projectDetails.map((project) => project.serialize())
      if (result.length <= 0) return response.redirect().toRoute('availableProjects')
      const projectpath = `projects/organization/${result.at(0)?.name}_${organization_id}`
      const projectDir = app.makePath(projectpath)
      await fs.mkdir(projectDir, { recursive: true })
      const filePath = app.makePath(projectpath, `${result.at(0)?.name}.js`)
      await fs.appendFile(filePath, '', 'utf-8')
      const content = await fs.readFile(filePath, 'utf-8')
      return inertia.render('monaco', { result, content })
    } catch (error) {
      console.log('projecthandller Error', error)
    }
  }
}
