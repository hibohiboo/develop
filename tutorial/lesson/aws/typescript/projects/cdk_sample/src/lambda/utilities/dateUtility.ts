import { format, parseISO as parse } from 'date-fns'

export const formatISO = (d: Date) => format(d, "yyyy-MM-dd'T'HH:mm:ss")
export const formatISOUTC = (d: Date) => format(d, "yyyy-MM-dd'T'HH:mm:ss'Z'")
export const parseISO = (s: string) => parse(s)
