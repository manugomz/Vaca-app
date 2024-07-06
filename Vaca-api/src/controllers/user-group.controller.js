import Service from '../services/user-group.service.js';
import { StatusCodes } from 'http-status-codes';

const Controller = () => {
    const create = async (req, res) => {
        const service = Service(req.dbClient);
        const groupMember = req.body;
        const createdGroupMember = await service.create(groupMember);
        res.status(StatusCodes.CREATED).json(createdGroupMember);
    };

    const getAllByGroupId = async (req, res) => {
        const service = Service(req.dbClient);
        const userGroupsByGroupId = await service.getAllByGroupId(req.params.groupid);
        return res.status(StatusCodes.OK).json(userGroupsByGroupId);
    };

    const getAvailableUsersByGroupId = async (req, res) => {
        const service = Service(req.dbClient);
        const usersByGroupId = await service.getAvailableUsersByGroupId(req.params.groupid);
        return res.status(StatusCodes.OK).json(usersByGroupId);
    };

    return { getAllByGroupId, getAvailableUsersByGroupId, create };
};

export default Controller;
