import axios from 'axios';
import { TragedySet, tragedySetList, TragedySetType } from '../models/TragedySet';
import {Role} from '../models/Role';

axios.interceptors.request.use(function (config) {
  config.timeout = 1000;
  config.responseType = 'json';
  return config;
}, function (error) {
  return Promise.reject(error);
});

/**
 * 指定したidの惨劇セットを取得
 * 
 * @param TragedySetType id 惨劇セットID
 * 
 * @return Promise 惨劇セットのjsonを返す
 */
export const getTragedySet = async (id:TragedySetType) =>{
  const item = tragedySetList.find(set=> set.id === id);
  const res = await axios.get('/tragedySets/' + item.fileName);
  const data:any = res.data;
  const set = new TragedySet(
               data.id,
               data.name,
               data.plotList,
               data.subplotNum,
               data.roleList.map(role=> new Role(role.id, role.name, role.limit)),
               data.incidentList);

  return set;//axios.get('/tragedySets/' + set.fileName);
}

// axios.get('/tragedySets/basicTragedy.json')
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
