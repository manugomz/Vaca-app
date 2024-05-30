const CREATE = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
const GET_ALL = 'SELECT * FROM users';
const GET_BY_ID = 'SELECT * FROM users WHERE userid = $1';
const DELETE_BY_ID = `DELETE FROM users WHERE userid = $1`;

const COUNT_BY_EMAIL = `SELECT COUNT(*) as count FROM users WHERE email = $1`;

export const Repository = (dbClient) => {
    const create = async ({ name, email, password }) => {
        const result = await dbClient.query(CREATE, [name, email, password]);
        return result.rows[0];
    };

    const countByEmail = async (email) => {
        const result = await dbClient.query(COUNT_BY_EMAIL, [email]);
        const count = parseInt(result.rows[0].count);
        if (isNaN(count)) {
            throw 'Invalid countByEmail';
        }
        return count;
    };

    const deleteById = async (id) => {
        const result = await dbClient.query(DELETE_BY_ID, [id]);
        return result.rowCount > 0;
    };

    const getAll = async () => {
        const result = await dbClient.query(GET_ALL);
        return result.rows;
    };

    const getById = async (id) => {
        const result = await dbClient.query(GET_BY_ID, [id]);
        return result.rows[0];
    };

    return { getAll, getById, create, countByEmail, deleteById };
};
