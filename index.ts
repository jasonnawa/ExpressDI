import "reflect-metadata";
import "express-async-errors";
import GlobalDIConfig from "./src/config/globalDI.config";
import Server from "./server";
import { container } from "tsyringe";


GlobalDIConfig.registerAllDI();

const server = container.resolve(Server)
server.start()
