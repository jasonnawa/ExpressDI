import { Router } from "express";
import BaseController from "../controllers/baseController";
import { injectable, inject, container } from "tsyringe";

@injectable()
export default class BaseRoutes {
    public readonly router: Router;
    private readonly _baseController: BaseController;


  constructor(@inject(BaseController) baseController: BaseController) {
    this.router = Router();
    this._baseController = baseController;
    this.registerRoute()
  }

  public async registerRoute() {
    this.router.get("/", (req, res) => {
      this._baseController.Hello(req, res);
    });
  }
}

export const registerBaseRoutesDI = () => {
  container.register(BaseRoutes.name, { useClass: BaseRoutes })
}

