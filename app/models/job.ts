import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Job extends BaseModel {
  public static table='jobs' 
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare project_id:number
  @column()
  declare result:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}