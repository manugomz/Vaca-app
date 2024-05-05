//Se encarga de las validaciones, capa más densa

import { Repository } from "../repositories/group.repository.js";
import AppError from "../lib/application.error.js";

const Service = (dbClient) => {
  const repository = Repository(dbClient);

  const create = async (group) => {
    // //clean string
    // const name = (group.name || "").trim();

    // //Validate name field
    // if (name.lenght === 0) {
    //   throw AppError("El nombre es requerido", 400);
    // }
    // if (name.lenght > 30) {
    //   throw AppError("El nombre debe tener menos de 30 caracteres", 400);
    // }

    // const groupCount = await repository.countByName(name);
    // if (groupCount>0){
    //   throw AppError("Ya existe un grupo con ese nombre", 409);
    // }
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

