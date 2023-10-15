import AppError from '../utils/AppError.js'
import { database } from '../database/knex/index.js'

import pkgBcryptjs from 'bcryptjs'
const { hash } = pkgBcryptjs

export default class UserController {
  async create(req, res) {
    const { name, email, password } = req.body
    const emailExists = await database('users').where({ email }).first()

    if (emailExists) {
      throw new AppError('E-mail is already registered.')
    }

    const hashedPassword = await hash(password, 8)
    const user = { name, email, password: hashedPassword }
    await database('users').insert(user)

    return res
      .status(201)
      .json({ message: 'User has been created successfully.' })
  }

  async update(req, res) {}

  async delete(req, res) {}
}
