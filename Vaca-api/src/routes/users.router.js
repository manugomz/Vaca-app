import Router from 'express-promise-router';
import Controller from '../controllers/users.controller.js';
import continuator from '../lib/continue.decorator.js';

//! TODO: Add schema

const UsersRouter = () => {
    const router = Router();
    const controller = Controller();

    // configuracion de rutas
    router.get('/', continuator(controller.getAll));
    router.post('/', continuator(controller.create));
    router.delete('/:id', continuator(controller.deleteById));
    router.get('/:id', continuator(controller.getById));

    return router;
};

export default UsersRouter;
