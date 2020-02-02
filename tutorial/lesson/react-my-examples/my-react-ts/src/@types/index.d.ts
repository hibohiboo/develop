export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}
export type FilterType = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';