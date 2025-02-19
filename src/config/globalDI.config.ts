import { registerUserController } from "../controllers/userController";
import { registerUserModelDI } from "../models/userModel";
import { registerBaseRoutesDI } from "../routes/baseRoutes";
import { registerUserRoutesDI } from "../routes/userRoutes";
import { registerEnvConfigurationDI } from "../utils/env-config";

export default class GlobalDIConfig{

    public static registerAllDI(){
        console.log("Registering all DI");
        registerEnvConfigurationDI()
        registerBaseRoutesDI()
        registerUserRoutesDI()
        registerUserController()
        registerUserModelDI()
    }

}