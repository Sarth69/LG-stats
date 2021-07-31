import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import "express-async-errors";
import { createConnection } from "typeorm";
import { config } from "./dbConfig";

import { statsRouter } from "./routes/stats";
import { roleRouter } from "./routes/role";
import { routePrint } from "./utils/routeDisplayer";
import { loginRouter } from "./routes/login";
import { playerRouter } from "./routes/player";
import { gameRouter } from "./routes/game";

createConnection(config)
  .then(async () => {
    const app = express();
    const PORT = 8000;

    // CORS
    app.use(
      cors({
        origin: [process.env.FRONTEND_HOSTNAME],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      })
    );

    // SESSION
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        name: "statsLGSession",
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(express.json());
    app.use("/public", express.static("uploads/"));

    // ROUTES
    app.get("/", (_req: Request, res: Response) =>
      res.send("Express + TypeScript Server")
    );
    app.use("/stats", statsRouter);
    app.use("/login", loginRouter);
    app.use("/player", playerRouter);
    app.use("/game", gameRouter);
    app.use("/role", roleRouter);

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
      console.log("Available routes are:");
      console.log(app._router.stack.forEach(routePrint.bind(null, [])));
      console.log("     ********     ");
    });
  })
  .catch((error) => console.log("🔥", error));
