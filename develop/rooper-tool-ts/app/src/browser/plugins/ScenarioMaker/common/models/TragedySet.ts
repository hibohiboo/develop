import { IIncident } from '../interfaces/IIncident';

/**
 * 惨劇セット
 *
 * @export
 * @class TragedySet
 *
 */
export class TragedySet {
  /**
   * Creates an instance of TragedySet.
   * @param {number} [id=0]
   * @param {string} [name='']
   * @param {*} [plotList=[]]
   * @param {number} [subplotNum=2]
   * @param {*} [roleList=[]]
   * @param {IIncident[]} [incidentList=[]]
   * @memberof TragedySet
   */
  constructor(
               public id: number = 0,
               public name: string = '',
               public plotList: any = [],
               public subplotNum: number = 2,
               public roleList: any = [],
               public incidentList: IIncident[] = []) {}
}

/**
 * 惨劇セット番号
 *
 * @export
 * @enum {number}
 */
export enum TragedySetType {
  first, basic, midnight, mystery, haunted,
}
