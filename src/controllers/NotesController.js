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

  async show(req, res) {
    const { id } = req.params
    const note = await database('notes').where({ id }).first()

    if (!note) {
      throw new AppError({ message: 'Note not found.' })
    }

    const tags = await database('tags').where({ note_id: id }).orderBy('name')
    return res.status(201).json({ ...note, tags })
  }

  async delete(req, res) {
    const { id } = req.body
    const note = await database('notes').where({ id }).first()

    if (!note) {
      throw new AppError('Note not found.')
    }

    await database('notes').where({ id }).delete()
    return res.json({ message: 'Note has been removed successfully' })
  }

  async index(req, res) {}
}
