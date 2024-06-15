import { Repository } from '../repositories/users.repository.js';
import AppError from '../lib/application.error.js';
import bcrypt from 'bcrypt';

const Service = (dbClient) => {
    const repository = Repository(dbClient);

    const create = async (user) => {
        const email = user.email;
        const userByEmailCount = await repository.countByEmail(email);
        user.password = await bcrypt.hash(user.password, 10);

        if (userByEmailCount > 0) {
            throw AppError('Ya existe un usuario con ese correo', 409);
        }
        return await repository.create(user);
    };

    const deleteById = async (id) => {
        return await repository.deleteById(id);
    };

    const getAll = async () => {
        return await repository.getAll();
    };

    const getByEmail = async (email) => {
        return await repository.getByEmail(email);
    };

    const getById = async (id) => {
        return await repository.getById(id);
    };

    return { getAll, getByEmail, getById, create, deleteById };
};

export default Service;
