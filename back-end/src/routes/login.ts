import { Segments, celebrate } from "celebrate";
import {
  isUserAuthenticated,
  signIn,
  signOut,
  signUp,
} from "../controllers/login";

import { SignInSchema } from "../schemas/SignIn";
import { SignUpSchema } from "../schemas/SignUp";
import { error_404 } from "../middlewares/page_error";
import express from "express";
import { verifyIsLogged } from "../middlewares/auth";

const router = express.Router({ mergeParams: true });

// CONTROLLER -----------------------------------

// ROUTES ---------------------------------------

//GET -----------------------
router.get("/is-user-authentified", verifyIsLogged, isUserAuthenticated);
router.get("/*", error_404);

// POST ---------------------
router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: SignInSchema,
  }),
  signIn
);
router.post(
  "/signup",
  celebrate({
    [Segments.BODY]: SignUpSchema,
  }),
  signUp
);
router.post("/signout", signOut);
router.post("/*", error_404);

export const loginRouter = router;
