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
        const name = groupValidations(group);
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

    const getAll = async () => {
        return await repository.getAll();
    };

    const getById = async (id) => {
        return await repository.getById(id);
    };

    function groupValidations(group) {
        //Name Validations
        const name = (group.name || '').trim();

        if (name.length === 0) {
            throw AppError('El nombre es requerido', 400);
        }
        if (name.length > 30) {
            throw AppError('El nombre debe tener menos de 30 caracteres', 400);
        }

        //Color Validations
        const color = (group.color || '').trim();

        if (color.slice(0, 1) !== '#') {
            throw AppError('El color debe estar en formato hex, incluyendo el #', 400);
        }

        if (color.length === 0) {
            throw AppError('El color es requerido', 400);
        }
        if (color.length !== 4 && color.length !== 7) {
            throw AppError('El color debe estar en formato hexadecimal', 400);
        }

        return name;
    }

    return {
        create,
        deleteById,
        fullUpdateById,
        getAll,
        getById,
    };
};
export default Service;
