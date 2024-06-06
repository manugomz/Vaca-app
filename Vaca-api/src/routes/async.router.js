import Router from 'express-promise-router';

import authRouter from './auth.router.js';
import groupsRouter from './groups.router.js';
import usersRouter from './users.router.js';

import { connectDatabase, commitDatabase, rollbackDatabase } from '../lib/database.middleware.js';

//Configurar rutas

const AsyncRouter = () => {
    const router = Router();

    router.use(connectDatabase);
    router.use('/groups', groupsRouter());
    router.use('/users', usersRouter());
    router.use('/auth', authRouter());
    router.use(commitDatabase);
    router.use(rollbackDatabase);

    return router;
};

export default AsyncRouter;
