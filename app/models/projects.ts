import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ProjectMember from './project_member.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Workspace from './workspace.js'

export default class Projects extends BaseModel {
  public static table = 'projects'
  @column({ isPrimary: true })
  declare id: number
  @hasMany(() => ProjectMember, {
    foreignKey: 'project_id',
  })
  declare members: HasMany<typeof ProjectMember>

  @hasMany(() => Workspace, {
    foreignKey: 'project_id',
  })
  declare workspaces: HasMany<typeof Workspace>
  @column()
  declare organization_id: number
  @column()
  declare created_by: number
  @column()
  declare name: string
  @column()
  declare description: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
