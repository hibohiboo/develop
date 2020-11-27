import type { ID } from './common'
import type { OptionalKeys } from './utils'
export interface DataStorage<T> {
  fetchAll: () => Promise<T[]>
  fetchByCompleted: (completed: boolean) => Promise<T[]>
  create: (todo: T) => Promise<void>
  update: (id: ID, update: OptionalKeys<T>) => Promise<T | null>
  remove: (id: ID) => Promise<ID | null>
}
