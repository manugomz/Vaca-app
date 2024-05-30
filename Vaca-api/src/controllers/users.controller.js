import Service from '../services/users.service.js';
import { StatusCodes } from 'http-status-codes';

const Controller = () => {
    const create = async (req, res) => {
        const service = Service(req.dbClient);
        const user = req.body;
        const createdUser = await service.create(user);
        res.status(StatusCodes.CREATED).json(createdUser);
    };

    const deleteById = async (req, res) => {
        const service = Service(req.dbClient);
        const deleted = await service.deleteById(req.params.id);
        if (!deleted) {
            res.status(StatusCodes.NOT_FOUND).end();
        } else {
            res.status(StatusCodes.OK).end();
        }
    };

    const getAll = async (req, res) => {
        const service = Service(req.dbClient);
        const users = await service.getAll();

        res.status(StatusCodes.OK).json(users);
    };

    const getById = async (req, res) => {
        const service = Service(req.dbClient);
        const userId = await service.getById(req.params.id);
        if (!userId) {
            res.status(StatusCodes.NOT_FOUND).end();
        } else {
            res.status(StatusCodes.OK).json(userId);
        }
    };

    return { getAll, getById, create, deleteById };
};

export default Controller;
