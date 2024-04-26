//Se encarga de las validaciones, capa más densa

import { Repository } from "../repositories/group.repository.js";
import AppError from "../lib/application.error.js";

const Service = (dbClient) => {
  const repository = Repository(dbClient);

  const create = async (group) => {
    //clean string
    const name = (group.name || "").trim();

    //Validate name field
    if (name.lenght === 0) {
      throw AppError("El nombre es requerido", 400);
    }
    if (name.lenght > 30) {
      throw AppError("El nombre debe tener menos de 30 caracteres", 400);
    }

    const groupCount = await repository.countByName(name);
    if (groupCount>0){
      throw AppError("Ya existe un grupo con ese nombre", 409);
    }

    return await repository.create(group);
  };

  const deleteById = async (id) => {
    return await repository.deleteById(id);
  };

  const getAll = async () => {
    return await repository.getAll();
  };

  const getById = async (id) => {
    return await repository.getById(id);
  };


  return {
    create,
    deleteById,
    getAll,
    getById,
  };
};
export default Service;

// import groupDB from "../database/memory";

// const getAll = (sort) => {
//   let groupDBsorted = [];

//   if (sort === "asc") {
//     groupDBsorted = groupDB.sort((a, b) => a.name.localeCompare(b.name));
//   } else {
//     groupDBsorted = groupDB.sort((a, b) => b.name.localeCompare(a.name)); //TODO:ASK else if?
//   }

//   return groupDBsorted.map((group) => ({
//     name: group.name,
//     color: group.color,
//     total: group.total,
//   }));
// };

// /**
//  * @param group string name
//  * @returns
//  **/

// const get = (name) => {
//   const foundGroup = groupDB.find((group) => group.name === name);
//   return foundGroup;
// };

// /**
//  * @param newGroup of the form: { name: string,
//     name: string <30 char
//     color: hex (#------)
//  * @returns
//  **/

// const create = (newGroup) => {
//   const groupName = newGroup.name;
//   const alreadyThere = groupDB.some((group) => group.name === groupName);
//   if (alreadyThere) {
//     return false;
//   }

//   if (newGroup.name.length > 30) {
//     return false;
//   }

//   if (newGroup.color.length !== 7 || newGroup.color.length !== 4) {
//     return false;
//   }

//   console.log(newGroup.color.length)

//   groupDB.push({
//     name: newGroup.name,
//     color: newGroup.color,
//     members: [],
//     total: 0,
//   });
//   return newGroup;
// };

// const remove = (groupToDelete) => {
//   const groupToDeleteName = groupToDelete.name;
//   const alreadyThere = groupDB.some((group) => group.name === groupToDeleteName);
//   if (alreadyThere) {
//     return true //! How TF do I remove;
//   }
// }

// module.exports = { getAll, get, create };