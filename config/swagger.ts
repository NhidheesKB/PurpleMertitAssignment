import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Purple Merit Assignment',
  version: '1.0.0',
  description: '',
  tagIndex: 2,
  productionEnv: 'production',
  info: {
    title: 'Purple Merit Assignment Swagger Docs',
    version: '1.0.0',
    description: '',
  },
  snakeCase: true,

  debug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'purpleMetrit-token',
    },
  },
  security:{
    cookieAuth:[]
  },
  authMiddlewares: ['auth'],
  defaultSecurityScheme: 'cookieAuth',
  persistAuthorization: true,
  showFullPath: false,
}
