import app from '@adonisjs/core/services/app'
import { WebSocketContext } from 'adonisjs-websocket'
import fs from 'node:fs/promises'
export default class WebsockethandllersController {
  public async handleSocket({ ws, params }: WebSocketContext) {
    const { roleId, projectName, organizationId } = params
    if (roleId == 3) return ws.close()
    const filePath = app.makePath(
      'projects/organization',
      `${projectName}_${organizationId}`,
      `${projectName}.js`
    )
    console.log('filePAth', filePath)
    ws.on('message', async (message) => {
      try {
        const data = message.toString()
        ws.broadcast(data, { ignoreSelf: true })
        await fs.writeFile(filePath, data, 'utf-8')
      } catch (error) {
        console.log('wsMeaasgeError', error)
      }
    })
    ws.on('close', async (code, reason) => {
      console.log('WebSocket connection closed', code, reason.toString())
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
    })
  }
}
