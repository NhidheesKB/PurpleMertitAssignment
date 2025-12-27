import Role, { roles } from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // const body = [
    //   { name: roles.owner,},
    //   { name: roles.collaborator },
    //   { name: roles.viewer },
    // ]
    // await Role.createMany(body)
  }
}
