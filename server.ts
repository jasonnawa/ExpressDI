import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { injectable, inject } from "tsyringe";
import {
  EnvConfiguration,
  disconnectFromDatabase,
  connectToDatabase,
} from "./src/utils";
import dotenv from "dotenv";
import { UserRoutes } from "./src/routes/userRoutes";
import BaseRoutes from "./src/routes/baseRoutes";
import corsOptions from "./src/config/corsOptions.config";
import helmet from "helmet";
import morgan from "morgan";

@injectable()
export default class Server {
  private readonly _apiVersion = "/v1";

  private readonly _app: express.Application;
  private readonly _envConfiguration: EnvConfiguration;
  private readonly _baseRoutes: BaseRoutes;
  private readonly _userRoutes: UserRoutes;

  constructor(
    @inject(EnvConfiguration.name) envConfig: EnvConfiguration,
    @inject(BaseRoutes.name) baseRoutes: BaseRoutes,
    @inject(UserRoutes.name) userRoutes: UserRoutes
  ) {
    dotenv.config();
    this._app = express();
    this._envConfiguration = envConfig;
    this._baseRoutes = baseRoutes;
    this._userRoutes = userRoutes;

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this._app.use(cors(corsOptions))
    this._app.use(cookieParser())
    this._app.use(helmet())
    this._app.use(morgan('dev'))
    this._app.use(express.json())
    this._app.use(express.urlencoded({extended: true}))
  }

  private setupRoutes() {
    this._app.use(`${this._apiVersion}/`, this._baseRoutes.router);
    this._app.use(`${this._apiVersion}/users`, this._userRoutes.router);
  }

  public async start() {
    this.handleGracefulShutdown();
    await connectToDatabase();
    this._app.listen(this._envConfiguration.PORT, () => {
      console.log(`Server is running on port ${this._envConfiguration.PORT}`);
    });
  }

  private async handleShutdown() {
    await disconnectFromDatabase();
    console.log("Shutting down gracefully ...");
    process.exit(0);
  }

  public handleGracefulShutdown() {
    process.on("SIGTERM", this.handleShutdown);
    process.on("SIGINT", this.handleShutdown);
  }
}
