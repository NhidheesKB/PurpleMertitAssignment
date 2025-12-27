import Projects from '#models/projects'
import type { HttpContext } from '@adonisjs/core/http'

export default class AvailableProjectsController {
  public async projects({auth,inertia}:HttpContext){
    try {
      const organization_id= auth.user?.organization_id
      const projects=await Projects.findManyBy('organization_id',organization_id)
      return inertia.render('availableProjects',{
        projects
      })

    } catch (error) {
      console.log("Get ALl projects Error",error)

    }
  }
}
