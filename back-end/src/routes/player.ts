import express from "express";
const router = express.Router({ mergeParams: true });
import { error_404 } from "../middlewares/page_error";
import { getMe, checkIsLogged } from "../controllers/player";
import { verifyIsLogged } from "../middlewares/auth";

// CONTROLLER -----------------------------------

// ROUTES ---------------------------------------

//GET -----------------------
router.get("/me", verifyIsLogged, getMe);
router.get("/is-logged", checkIsLogged);
router.get("/*", error_404);

// POST ---------------------

router.post("/*", error_404);

export const playerRouter = router;
