const CREATE = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";

export const Repository = (dbClient)=>{
    const create = async ({name,email,password})=>{
        const result = await dbClient.query(CREATE, [name, email, password])
        return result.rows[0]
    }

    return {create}
}