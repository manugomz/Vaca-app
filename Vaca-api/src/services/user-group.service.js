import { Repository } from '../repositories/user-group.repository.js';
import AppError from '../lib/application.error.js';
import ConflictException from '../lib/conflict.exception.js';

const Service = (dbClient) => {
    const repository = Repository(dbClient);

    const create = async (userGroup) => {
        const { groupid, userids } = userGroup;

        const groupCount = await repository.countGroupsById(groupid);
        if (Number(groupCount) === 0) {
            throw AppError('No existe un grupo con ese id', 409);
        }

        const existingUsersInGroup = await repository.getAllByGroupId(groupid);

        const userGroups = [];

        // userids.forEach(async (userId) => {
        //     try {
        //         const existingUser = await repository.countUsersById(userId);
        //         if (existingUser === 0) {
        //             throw new ConflictException(`El usuario ${userId} no existe`, 400);
        //         }
        //     } catch (error) {
        //         //????????
        //     }
        // });

        userids.forEach(async (userId) => {
            // existingUsersInGroup.forEach(async (existingUser) => {
            //     if (existingUser.userid === userId) {
            //         throw AppError(`El usuario con id ${userId} ya pertenece a este grupo`, 409);
            //     }
            // });

            const userGroup = await repository.create({
                userId,
                groupid,
            });

            userGroups.push(userGroup);
        });

        return userGroups;
    };

    const getAllByGroupId = async (groupid) => {
        return await repository.getAllByGroupId(groupid);
    };

    const getAvailableUsersByGroupId = async (groupid) => {
        return await repository.getAvailableUsersByGroupId(groupid);
    };

    return { getAllByGroupId, getAvailableUsersByGroupId, create };
};

export default Service;
