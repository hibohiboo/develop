import { Character } from '../models/character';
// const characterList  = require( '../data/characterList');

// export const CHARACTERS: Character[] = function(){
//   const ret:Character[] = characterList.map(char=>{
//     let {id, name, paranoia_limit } = char;

//     if (char.name === 'イレギュラー') {
//       return new IllegularCharacter(id, name, paranoia_limit);
//     }

//     return new Character(id, name, paranoia_limit);
//   });
//   return ret;
// }();
const characterListData = require('../data/characterList');

export const getFirstCharacterList = ():Character[] =>{
  // idが10以下のキャラクターを初期選択。
  const characterList = characterListData.map(char=>{
    return new Character(char.id, char.name, char.paranoiaLimit, char.id < 10)
  });
  return characterList;
}

export const getCharacter = (id:number, selected:boolean = false):Character =>{
  // idが10以下のキャラクターを初期選択。
  const data = characterListData.find(char=>char.id === id);

  return new Character(data.id, data.name, data.paranoiaLimit, selected);
}