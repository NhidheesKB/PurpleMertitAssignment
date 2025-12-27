import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    // const hashPassword = await hash.make('demouser@myorg.com')
    // const body = {
    //   organization_id: 1,
    //   full_name: 'Demo User',
    //   email: 'demouser@gmail.com',
    //   password: hashPassword,
    //   created_at: db.raw('CURRENT_TIMESTAMP'),
    //   updated_at: db.raw('CURRENT_TIMESTAMP'),
    // }
    // await db.table('users').insert(body)
    // Write your database queries inside the run method
  }
}
