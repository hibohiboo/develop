import type { ValueOf } from './types'
export const statusCode = {
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  NotFound: 404,
} as const
export type StatusCode = ValueOf<typeof statusCode>

export const paths = { todos: '/api/todos' }
