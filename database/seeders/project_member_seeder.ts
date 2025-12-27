import ProjectMember from '#models/project_member'
import { roles } from '#models/role'
import Workspace from '#models/workspace'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const body={
      project_id:1,
      user_id:1,
      role_id:1,
    }
    const workspaceBody={
      project_id:2,
      name:'Editor project Workspace'
    }
    await ProjectMember.create(body)
    // await Workspace.create(workspaceBody)
  }
}
