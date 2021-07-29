import express from "express";
import { Segments, celebrate } from "celebrate";
const router = express.Router({ mergeParams: true });
import { error_404 } from "../middlewares/page_error";
import { GameIDSchema } from "../schemas/gameID";
import {
  newGame,
  getGame,
  setDate,
  deletePlayer,
  newGM,
  newPlayer,
} from "../controllers/game";

// CONTROLLER -----------------------------------

// ROUTES ---------------------------------------

//GET -----------------------
router.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: GameIDSchema,
  }),
  getGame
);
router.get("/*", error_404);

// POST ---------------------

router.post("/", newGame);
router.post("/gm", newGM);
router.post("/player", newPlayer);
router.post("/date", setDate);
router.post("/player/delete", deletePlayer);
router.post("/*", error_404);

export const gameRouter = router;
