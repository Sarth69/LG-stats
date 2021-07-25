import express from "express";
import { statsPrint } from "../controllers/stats";
import { error_404 } from "../middlewares/page_error";

const router = express.Router({ mergeParams: true });

router.get("/print/", statsPrint);

router.get("/*", error_404);

export const statsRouter = router;
