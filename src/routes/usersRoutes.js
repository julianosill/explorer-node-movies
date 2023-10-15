import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const usersRoutes = Router()
const userController = new UserController()

usersRoutes.post('/', userController.create)
usersRoutes.put('/:id', userController.update)
usersRoutes.delete('/delete', userController.delete)

export default usersRoutes
