import AppError from '../utils/AppError.js'
import { database } from '../database/knex/index.js'

export default class NotesController {
  async create(req, res) {
    const { title, description, user_id, vote, tags } = req.body

    if (!vote) {
      throw new AppError('Vote must be provided.')
    }

    if (!tags) {
      throw new AppError('Tags must be provided.')
    }

    const [note_id] = await database('notes').insert({
      title,
      description,
      user_id,
      vote,
    })

    const addTags = tags.map((name) => {
      return { note_id, name, user_id }
    })
    await database('tags').insert(addTags)

    return res
      .status(201)
      .json({ message: 'Note has been added successfully.' })
  }

  async update(req, res) {}

  async delete(req, res) {}
}
