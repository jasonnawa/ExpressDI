import { inject, injectable } from "tsyringe";
import BaseModel from "../models/baseModel";

@injectable()
export default class BaseController{
private _model: BaseModel

constructor(@inject(BaseModel) baseModel: BaseModel){
 this._model = baseModel
}


public async Hello(req,res){
    console.log('Hello World!')
}

}