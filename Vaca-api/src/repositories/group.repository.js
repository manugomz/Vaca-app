//Responsabilidad: Lllevar otraer datos de la base de datos NADA MÁS

const COUNT_BY_NAME = `${GET_ALL} WHERE name = $1`;
const CREATE = `INSERT INTO groups (name,color) 
                VALUES ($1,$2)
                RETURNING id, name, color`;
const DELETE_BY_ID = `DELETE FROM groups WHERE id = $1`;
const GET_ALL = `SELECT id, name, color FROM groups`;
const GET_BY_ID = `SELECT COUNT(*) as count FROM groups WHERE name = $1 `;

export const Repository = (dbClient) => {

  const countByName = async (name) => {
    const result = await dbClient.query(COUNT_BY_NAME, [name]);
    const count =parseInt(result.rows[0].count);
    if(isNaN(count)){
      throw 'Invalid count by name';
    }
    return count
  };
  const create = async ({ name, color }) => {
    const result = await dbClient.query(CREATE, [name, color]);
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

  return {
    countByName,
    create,
    deleteById,
    getAll,
    getById,
  };
};
