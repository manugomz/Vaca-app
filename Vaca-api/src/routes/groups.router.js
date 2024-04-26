import Router from 'express-promise-router';
import Controller from '../controllers/groups.controller.js';
import continuator from '../lib/continue.decorator.js';

const GroupsRouter= ()=>{

    const router = Router();
    const controller = Controller();

    // configuracion de rutas
    router.get('/groups', continuator(controller.getAll));
    router.get('/group/:id', continuator(controller.getById));
    router.delete('/group/:id', continuator(controller.deleteById));
    


    return router
};

export default GroupsRouter