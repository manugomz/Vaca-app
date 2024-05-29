//Responsabilidad: Llevar otraer datos de la base de datos NADA MÁS
//Capa de persistencia
const CREATE = `INSERT INTO groups (name,color, ownerUserId) 
                VALUES ($1,$2,$3) 
                RETURNING id, name, color, ownerUserId`;
const GET_ALL = `SELECT * FROM groups ORDER BY createdate desc`;
const GET_BY_ID = `SELECT * FROM groups WHERE id = $1`;
const DELETE_BY_ID = `DELETE FROM groups WHERE id = $1`;

const COUNT_BY_NAME = `SELECT COUNT(*) as count FROM groups WHERE name = $1`;
const COUNT_BY_NAME_NOT_ID = `SELECT COUNT(*) FROM groups WHERE name = $1 AND id <> $2`;
const FULL_UPDATE_BY_ID = `UPDATE groups
                        SET name = $1, color = $2
                        WHERE id= $3 `;

export const Repository = (dbClient) => {
    const create = async ({ name, color, ownerUserId }) => {
        const result = await dbClient.query(CREATE, [name, color, ownerUserId]);
        return result.rows[0];
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

    const countByName = async (groupName) => {
        const result = await dbClient.query(COUNT_BY_NAME, [groupName]);
        const count = parseInt(result.rows[0].count);

        if (isNaN(count)) {
            throw 'Invalid countByName';
        }
        return count;
    };

    const countByNameNotId = async (name, id) => {
        const result = await dbClient.query(COUNT_BY_NAME_NOT_ID, [name, id]);
        const count = parseInt(result.rows[0].count);

        if (isNaN(count)) {
            throw 'Invalid countByName';
        }
        return count;
    };

    const fullUpdateById = async ({ name, color, id }) => {
        const result = await dbClient.query(FULL_UPDATE_BY_ID, [name, color, id]);

        return result.rowCount > 0;
    };

    return {
        create,
        countByName,
        countByNameNotId,
        deleteById,
        fullUpdateById,
        getAll,
        getById,
    };
};
