const express = require('express');
const groupsControllers = require('../controllers/groups');

const router = express.Router();

// inicio logica/presentacion
router.get("/groups", groupsControllers.getAll);

router.get("/groups/:name", groupsControllers.get);

//router.post("/pets", groupsControllers.create);

module.exports= router;