import { Repository } from "../repositories/users.repository.js";
import AppError from "../lib/application.error.js"

const Service = (dbClient)=>{
    const repository = Repository(dbClient);

    const create = async(user)=>{

        //~ FALTAN VALIDACIONES
        return await repository.create(user)
    }

    return create
}


export default Service
