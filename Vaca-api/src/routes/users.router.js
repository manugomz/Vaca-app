import Router from 'express-promise-router';
import Controller from '../controllers/users.controller.js';
import continuator from '../lib/continue.decorator.js';
import validate from '../lib/validation.middleware.js';
import schema from '../schemas/users.schema.js';

const UsersRouter = () => {
    const router = Router();
    const controller = Controller();

    router.get('/', continuator(controller.getAll));
    router.post('/', validate({ body: schema }), continuator(controller.create));
    router.delete('/:id', continuator(controller.deleteById));
    router.get('/:id', continuator(controller.getById));

    return router;
};

export default UsersRouter;
