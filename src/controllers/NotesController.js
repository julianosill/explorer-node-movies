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
    const { id } = req.params
    const note = await database('notes').where({ id }).first()

    if (!note) {
      throw new AppError('Note not found.')
    }

    await database('notes').where({ id }).delete()
    return res.json({ message: 'Note has been removed successfully.' })
  }

  async index(req, res) {
    const { title, user_id, tags, order } = req.query
    const movieTags = await database('tags').orderBy('name')
    let notes = []

    if (tags) {
      const queryTags = tags.split(',').map((tag) => tag.trim())
      notes = await database('tags')
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .whereIn('name', queryTags)
        .modify(function (queryBuilder) {
          if (user_id) {
            queryBuilder.where({ 'notes.user_id': user_id })
          }
          if (title) {
            queryBuilder.whereLike('notes.title', `%${title}%`)
          }
        })
        .select([
          'notes.id',
          'notes.title',
          'notes.description',
          'notes.vote',
          'notes.user_id',
          'notes.created_at',
          'notes.updated_at',
        ])
        .orderBy('notes.updated_at', order || 'desc')
    } else {
      notes = await database('notes')
        .modify(function (queryBuilder) {
          if (user_id) {
            queryBuilder.where({ user_id })
          }
          if (title) {
            queryBuilder.whereLike('title', `%${title}%`)
          }
        })
        .orderBy('updated_at', order || 'desc')
    }

    const notesWithTags = notes.map((note) => {
      const noteTags = movieTags.filter((tag) => tag.note_id === note.id)
      const tagNames = noteTags.map((tag) => tag.name)
      return { ...note, tags: tagNames }
    })
    notes = notesWithTags

    if (notes.length <= 0) {
      throw new AppError('Notes not found.')
    }

    return res.status(201).json(notes)
  }
}
