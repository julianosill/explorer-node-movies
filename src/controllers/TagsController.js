import AppError from '../utils/AppError.js'
import { database } from '../database/knex/index.js'

export default class TagsController {
  async index(req, res) {
    const { user_id, note_id, order } = req.query

    const tagList = await database('tags')
      .modify(function (queryBuilder) {
        if (user_id) {
          queryBuilder.where({ user_id })
        }
        if (note_id) {
          queryBuilder.where({ note_id })
        }
      })
      .orderBy('name', order || 'asc')

    if (tagList.length <= 0) {
      throw new AppError('Tags not found.')
    }

    return res.status(201).json(tagList)
  }
}
