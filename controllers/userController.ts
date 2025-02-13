import { inject } from "tsyringe";
import UserModel from "../models/userModel";

export class UserController{
    public readonly model: UserModel

    constructor(@inject(UserModel) userModel: UserModel){
        this.model = userModel
    }


    public async getAllUsers(req, res){
        console.log('users gotten')
    }
}