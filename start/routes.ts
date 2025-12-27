import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const LoginController = () => import('#controllers/login_controller')
const CreateprojectsController = () => import('#controllers/createprojects_controller')
const UpdateprojectsController = () => import('#controllers/updateprojects_controller')
const DeleteProjectsController = () => import('#controllers/delete_projects_controller')
const AvailableProjectsController = () => import('#controllers/available_projects_controller')
const PojectHandllersController = () => import('#controllers/poject_handllers_controller')
const WebsockethandllersController=()=>import('#controllers/websockethandllers_controller')
router
  .group(() => {
    router.post('/create-project', [CreateprojectsController, 'create'])
    router.put('/update-project', [UpdateprojectsController, 'update'])
    router.post('/delete-project', [DeleteProjectsController, 'handledelete'])
    router
      .get('/available-project', [AvailableProjectsController, 'projects'])
      .as('availableProjects')
    router.get('/', [PojectHandllersController, 'handleProject']).as('projectHandller')
    router.ws('/editor/:organizationId/:projectName/:roleId',[WebsockethandllersController,'handleSocket'])
  })
  .use(middleware.auth())

router.on('/login').renderInertia('login')
router.post('/login', [LoginController, 'handleLogin'])

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
