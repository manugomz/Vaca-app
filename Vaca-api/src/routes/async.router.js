import Router from 'express-promise-router';

import authRouter from './auth.router.js';
import groupsRouter from './groups.router.js';
import usersRouter from './users.router.js';

//Configurar rutas

const AsyncRouter = () => {
    const router = Router();

    router.use('/groups', groupsRouter());
    router.use('/users', usersRouter());
    router.use('/auth', authRouter());

    return router;
};

export default AsyncRouter;
