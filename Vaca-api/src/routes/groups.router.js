import Router from "express-promise-router";
import Controller from "../controllers/groups.controller.js";
import continuator from "../lib/continue.decorator.js";

const GroupsRouter = () => {
  const router = Router();
  const controller = Controller();

  // configuracion de rutas
  router.get("/groups", continuator(controller.getAll));
  router.get("/groups/:id", continuator(controller.getById));
  router.delete("/groups/:id", continuator(controller.deleteById));
  router.post("/groups", continuator(controller.create));

  return router;
};

export default GroupsRouter;
