import { Router } from "express";
import BaseController from "../controllers/baseController";
import { injectable, inject } from "tsyringe";

@injectable()
export default class BaseRoutes {
    public readonly router: Router;
    private readonly _baseController: BaseController;


  constructor(@inject(BaseController) baseController: BaseController) {
    this._baseController = baseController;
  }

  public async registerRoute() {
    this.router.get("/", (req, res) => {
      this._baseController.Hello(req, res);
    });
  }
}
