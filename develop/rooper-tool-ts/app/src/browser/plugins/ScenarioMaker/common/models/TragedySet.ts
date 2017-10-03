import { IIncident } from './IIncident';

export class TragedySet {
  constructor(
               public id: number = 0,
               public name: string = '',
               public plotList: any = [],
               public subplotNum: number = 2,
               public roleList: any = [],
               public incidentList: IIncident[] = []) {}
}

export enum TragedySetType {
  first, basic, midnight, mystery, haunted,
}
