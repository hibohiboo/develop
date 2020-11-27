// https://qiita.com/mizchi/items/5c359fb5b5e921a7d55f
export type ValueOf<T> = T[keyof T]
export type OptionalKeys<T> = { [K in keyof T]?: T[K] | null }
