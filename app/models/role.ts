import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export enum roles{
  owner='Owner',
  collaborator='Collaborator',
  viewer='Viewer'
  }
export default class Role extends BaseModel {
  public static table ='roles'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name:roles

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
