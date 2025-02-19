import { container, inject, injectable } from "tsyringe";
import { UserController } from "../controllers/userController";
import { Router } from "express";

@injectable()
export class UserRoutes {
    public readonly router: Router
    private readonly _userController: UserController

    constructor(
        @inject(UserController.name) userController: UserController
    ){
        this.router = Router()
        this._userController = userController

        this.registerRoutes()

    }


    private registerRoutes (){

        this.router.get('/', (req, res)=>{
            this._userController.getAllUsers(req, res)
        })
    } 
}

export const registerUserRoutesDI = () => {
    container.register(UserRoutes.name, {useClass: UserRoutes})
}