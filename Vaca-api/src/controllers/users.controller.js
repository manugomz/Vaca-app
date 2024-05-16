import Service from "../services/users.service.js";
import { StatusCodes } from "http-status-codes";

const Controller =()=>{
    const create = async (req,res)=>{
        const service = Service(req.dbClient)
        const user = req.body
        const createdUser = await service.create(user)
        res.status(StatusCodes.CREATED).json(createdUser)
    }

    return{create}

}

export default Controller