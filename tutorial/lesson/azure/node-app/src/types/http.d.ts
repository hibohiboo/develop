import type { Request, Response, NextFunction } from 'express'
import type { StatusCode } from '../constants'
export interface HttpError extends Error {
  statusCode?: StatusCode
}
export type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void
