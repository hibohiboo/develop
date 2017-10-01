// import { Rule } from `./rule`;
export class TragedySet {
  constructor(
               public id:number = 0,
               public name: string = "",
               public plotList: any = [],
               public subplotNum: number = 2,
               public roleList:any = [],
               public incidentList:IIncident[] = []){}
}
export interface IIncident{
  id:number;
  name:string;
  effect:string;
}

export enum TragedySetType {
  first, basic, midnight, mystery, haunted  
} 

export const tragedySetList = [
  {id:TragedySetType.first,    name: `First Steps`,   fileName: `firstSteps.json`},
  {id:TragedySetType.basic,    name: `Basic Tragedy`, fileName: `basicTragedy.json`},
  {id:TragedySetType.midnight, name: `Midnight Zone`, fileName: `midnightZone.json`},
  {id:TragedySetType.mystery,  name: `Mystery Circle`,   fileName: `mysteryCircle.json`},
  {id:TragedySetType.haunted,  name: `Haunted Stage`, fileName: `hauntedStage.json`},
];