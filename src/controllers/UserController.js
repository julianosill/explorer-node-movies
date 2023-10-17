import AppError from '../utils/AppError.js'
import { database } from '../database/knex/index.js'

import pkgBcryptjs from 'bcryptjs'
const { hash, compare } = pkgBcryptjs

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isValidEmail = (email) => emailRegex.test(email)

export default class UserController {
  async create(req, res) {
    const { name, email, password } = req.body

    if (!isValidEmail(email)) {
      throw new AppError('E-mail is invalid.')
    }

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

  async update(req, res) {
    const { id } = req.params
    const { name, email, currentPassword, newPassword } = req.body
    const user = await database('users').where({ id }).first()
    const emailExists = await database('users').where({ email }).first()

    if (!user) {
      throw new AppError('User not found.')
    }

    if (email && !isValidEmail(email)) {
      throw new AppError('E-mail is invalid.')
    }

    if (emailExists && emailExists.id !== user.id) {
      throw new AppError('E-mail is already registered.')
    }

    if (newPassword) {
      if (!currentPassword) {
        throw new AppError('Current password cannot be empty.')
      }
      const isCorrect = await compare(currentPassword, user.password)
      if (!isCorrect) {
        throw new AppError('Current password is incorrect.')
      }
      user.password = await hash(newPassword, 8)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    await database('users').where({ id }).update(user)

    return res.status(200).json({ message: 'User has been updated.' })
  }

  async delete(req, res) {
    const { id } = req.params
    const { password, confirmPassword } = req.body
    const user = await database('users').where({ id }).first()

    if (!user) {
      throw new AppError('User not found.')
    }

    if (!password) {
      throw new AppError('Password was not informed.')
    }

    if (password !== confirmPassword) {
      throw new AppError('Password does not match.')
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new AppError('Password is incorrect.')
    }

    await database('users').where({ id }).delete()

    return res
      .status(201)
      .json({ message: 'User has been removed successfully.' })
  }
}
