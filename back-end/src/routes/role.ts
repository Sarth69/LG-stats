import express from "express";
import { Segments, celebrate } from "celebrate";
const router = express.Router({ mergeParams: true });
import { error_404 } from "../middlewares/page_error";
import { newRole, getRoles } from "../controllers/role";
import { NewRoleSchema } from "../schemas/newRole";

// CONTROLLER -----------------------------------

// ROUTES ---------------------------------------

//GET -----------------------
router.get("/", getRoles);
router.get("/*", error_404);

// POST ---------------------

router.post(
  "/",
  celebrate({
    [Segments.BODY]: NewRoleSchema,
  }),
  newRole
);
router.post("/*", error_404);

export const roleRouter = router;
