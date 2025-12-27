import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Projects from './projects.js'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Workspace extends BaseModel {
  public static table='workspaces'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare project_id:number
  // @belongsTo(() => Projects, {
  //     foreignKey: 'project_id',
  //     localKey: 'id',
  //   })
  //   declare Projects: BelongsTo<typeof Projects>
  @column()
  declare name:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
