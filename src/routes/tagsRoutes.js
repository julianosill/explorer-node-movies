import { Router } from 'express'
import TagsController from '../controllers/TagsController.js'

const tagsRoutes = Router()
const tagsController = new TagsController()

tagsRoutes.get('/', tagsController.index)
tagsRoutes.get('/:name', tagsController.show)

export default tagsRoutes
