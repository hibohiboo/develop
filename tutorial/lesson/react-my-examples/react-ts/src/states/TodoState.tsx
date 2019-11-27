export default class TodoState {
  constructor(
    public id: number,
    public text: string,
    public completed: boolean = false,
  ){
  }
}
