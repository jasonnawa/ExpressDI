import { container, inject } from "tsyringe";
import UserModel from "../models/userModel";
import { injectable } from "tsyringe";

@injectable()
export class UserController{
    public readonly model: UserModel

    constructor(@inject(UserModel.name) userModel: UserModel){
        this.model = userModel
    }


    public async getAllUsers(req, res){
        console.log('users gotten')
    }
}

export const registerUserController = () => {
    container.register(UserController.name, {useClass: UserController})
}