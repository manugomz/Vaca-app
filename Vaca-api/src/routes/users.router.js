import Router from "express-promise-router"
import Controller from "../controllers/users.controller.js"
import continuator from "../lib/continue.decorator.js"

const UsersRouter = () => {
    const router = Router()
    const controller = Controller()

    // configuracion de rutas
    router.post("/", continuator(controller.create))

    return router
}

export default UsersRouter