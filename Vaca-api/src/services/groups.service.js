//Se encarga de las validaciones, capa más densa

import { Repository } from '../repositories/groups.repository.js';
import AppError from '../lib/application.error.js';

const Service = (dbClient) => {
    const repository = Repository(dbClient);

    const create = async (group) => {
        const { name } = group;
        const groupCount = await repository.countByName(name);
        if (groupCount > 0) {
            throw AppError('Ya existe un grupo con ese nombre', 409);
        }
        return await repository.create(group);
    };

    const deleteById = async (id) => {
        return await repository.deleteById(id);
    };

    const fullUpdateById = async (group) => {
        const name = group.name;
        const existingGroup = await repository.getById(group.id);
        //Validations with DB
        if (!existingGroup) {
            throw AppError('No existe el grupo a modificar', 404);
        }
        const groupCount = await repository.countByNameNotId(name, group.id);
        if (groupCount > 0) {
            throw AppError('Ya existe otro grupo con ese nombre', 409);
        }
        return await repository.fullUpdateById({
            ...group,
            name,
        });
    };

    const getAll = async (ownerUserId) => {
        return await repository.getAll(ownerUserId);
    };

    const getById = async (id) => {
        return await repository.getById(id);
    };

    return {
        create,
        deleteById,
        fullUpdateById,
        getAll,
        getById,
    };
};
export default Service;
