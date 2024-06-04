import Router from 'express-promise-router';

import Controller from '../controllers/auth.controller.js';
import continuator from '../lib/continue.decorator.js';

const AuthRouter = () => {
    const router = Router();
    const controller = Controller();

    router.post('/login', continuator(controller.login));

    return router;
};

export default AuthRouter;
