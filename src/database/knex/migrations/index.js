import knex from 'knex'
import config from '../../../../knexfile.js'

export const connection = knex(config.development)
