import Router from 'express-promise-router';
import Controller from '../controllers/users.controller.js';
import continuator from '../lib/continue.decorator.js';

//! TODO: Add schema

const UsersRouter = () => {
    const router = Router();
    const controller = Controller();

    // configuracion de rutas
    router.get('/', continuator(controller.getAll));
    router.get('/:id', continuator(controller.getById));
    router.delete('/:id', continuator(controller.deleteById));
    router.post('/', continuator(controller.create));

    return router;
};

export default UsersRouter;
