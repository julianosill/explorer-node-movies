import { Router } from 'express'
import NotesController from '../controllers/NotesController.js'

const notesRoutes = Router()
const notesController = new NotesController()

notesRoutes.get('/', notesController.index)
notesRoutes.get('/:id', notesController.show)
notesRoutes.post('/add', notesController.create)
notesRoutes.delete('/delete', notesController.delete)

export default notesRoutes
