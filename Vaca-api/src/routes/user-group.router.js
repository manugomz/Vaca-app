import Router from 'express-promise-router';
import Controller from '../controllers/user-group.controller.js';
import continuator from '../lib/continue.decorator.js';
import validate from '../lib/validation.middleware.js';
import schema from '../schemas/user-group.schema.js';

const UserGroupRouter = () => {
    const router = Router();
    const controller = Controller();

    router.get('/:groupid', continuator(controller.getAllByGroupId));
    router.get('/usersavailable/:groupid', continuator(controller.getAvailableUsersByGroupId));
    router.post('/', validate({ body: schema }), continuator(controller.create));
    //router.delete('/:groupid/:userid', continuator(controller.removeById));

    return router;
};

export default UserGroupRouter;
