import AppError from '../lib/application.error.js';

const CREATE = 'INSERT INTO USERGROUP (userid, groupid) VALUES ($1, $2) RETURNING *';
const GET_ALL_BY_GROUP_ID = 'SELECT * FROM USERGROUP WHERE groupid = $1';
const GET_AVAILABLE_USERS_BY_GROUP_ID =
    'SELECT u.userid, u.name, u.email from USERS u where userid not in (select userid from USERGROUP where groupid = $1)';

const COUNT_GROUP_BY_ID = `SELECT COUNT(*) as count FROM groups WHERE id = $1`;
const COUNT_USERS_BY_ID = 'SELECT COUNT(*) as count FROM users WHERE userid = $1';

export const Repository = (dbClient) => {
    const create = async ({ userId, groupid }) => {
        const result = await dbClient.query(CREATE, [userId, groupid]);
        return result.rows[0];
    };

    const getAllByGroupId = async (groupid) => {
        const result = await dbClient.query(GET_ALL_BY_GROUP_ID, [groupid]);
        return result.rows;
    };

    const getAvailableUsersByGroupId = async (groupid) => {
        const result = await dbClient.query(GET_AVAILABLE_USERS_BY_GROUP_ID, [groupid]);
        return result.rows;
    };

    const countGroupsById = async (groupid) => {
        const result = await dbClient.query(COUNT_GROUP_BY_ID, [groupid]);

        const count = parseInt(result.rows[0].count);
        if (isNaN(count)) {
            throw AppError('Invalid count groups by id', 400);
        }
        return result.rows[0].count;
    };

    const countUsersById = async (userid) => {
        const result = await dbClient.query(COUNT_USERS_BY_ID, [userid]);
        const count = parseInt(result.rows[0].count);
        if (isNaN(count)) {
            throw AppError('Invalid count users by id', 400);
        }
        return count;
    };

    return { getAllByGroupId, getAvailableUsersByGroupId, countGroupsById, countUsersById, create };
};
