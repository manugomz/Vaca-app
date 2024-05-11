import Service from '../services/groups.service.js'
import { StatusCodes } from 'http-status-codes'

const Controller = () => {
    const create = async (req, res) => {
        const service = Service(req.dbClient)
        const group = req.body
        const createdGroup = await service.create(group)
        res.status(StatusCodes.CREATED).json(createdGroup)
    }

    const deleteById = async (req, res) => {
        const service = Service(req.dbClient)
        const deleted = await service.deleteById(req.params.id)

        if (!deleted) {
            res.status(StatusCodes.NOT_FOUND).end()
        } else {
            res.status(StatusCodes.OK).end()
        }
    }

    const fullUpdateById = async (req, res) => {
        const service = Service(req.dbClient)
        const id = req.params.id
        const group = { ...req.body, id }
        const updatedGroup = await service.fullUpdateById(group)

        if (updatedGroup) {
            res.status(StatusCodes.OK).end()
        } else {
            res.status(StatusCodes.NOT_FOUND)
        }
    }

    const getAll = async (req, res) => {
        const service = Service(req.dbClient)
        const groups = await service.getAll()

        res.status(StatusCodes.OK).json(groups)
    }

    const getById = async (req, res) => {
        const service = Service(req.dbClient)
        const group = await service.getById(req.params.id)

        if (!group) {
            res.status(StatusCodes.NOT_FOUND).end()
        } else {
            res.status(StatusCodes.OK).json(group)
        }
    }

    return {
        create,
        deleteById,
        fullUpdateById,
        getAll,
        getById,
    }
}

export default Controller
