import { Router } from 'express'

import usersRoutes from './usersRoutes.js'
import notesRoutes from './notesRoutes.js'
import tagsRoutes from './tagsRoutes.js'

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/notes', notesRoutes)
routes.use('/tags', tagsRoutes)

export default routes
