
const Router = require('express-promise-router');
const groupsControllers = require('../controllers/groups');

const router = Router();

// inicio logica/presentacion
router.get("/groups", groupsControllers.getAll);

router.get("/groups/:name", groupsControllers.get);

router.post("/groups", groupsControllers.create);

module.exports= router;