const groupDB = require("../database/memory");

const getAll = () => {
  return groupDB.map(group=>({name:group.name}));
};

/** 
 * @param group string name
 * @returns
 **/

const get = (name) => {
  const foundGroup = groupDB.find((group) => group.name === name);
  return foundGroup;
};

/** 
 * @param newGroup of the form: { name: string,
    amount:number,
    members: array of strings
 * @returns
 **/

// const create = (newGroup) => {

//     const groupName = group.name;
  
//     const alreadyThere = groupDB.some((group) => group.name === groupName);
//     if (alreadyThere) {
//       return;
//     }
  
//     groupDB.push({
//       name: group.name,
//       color: group.color,
//       weight: group.weight,
//     });
//   }


module.exports = { getAll, get};
