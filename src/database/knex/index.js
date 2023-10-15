import knex from 'knex'
import config from '../../../knexfile.js'

export const database = knex(config.development)
