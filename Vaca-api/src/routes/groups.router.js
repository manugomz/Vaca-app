//Capa de presentación
import Router from 'express-promise-router';
import Controller from '../controllers/groups.controller.js';
import continuator from '../lib/continue.decorator.js';
import validate from '../lib/validation.middleware.js';
import schema from '../schemas/group.schema.js';
import passport from 'passport';

const GroupsRouter = () => {
    const router = Router();
    const controller = Controller();

    // configuracion de rutas
    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        continuator(controller.getAll),
    );
    router.get('/:id', continuator(controller.getById));
    router.delete('/:id', continuator(controller.deleteById));
    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        validate({ body: schema }),
        continuator(controller.create),
    );
    router.put('/:id', validate({ body: schema }), continuator(controller.fullUpdateById));

    return router;
};

export default GroupsRouter;
