import { Router } from "express";
import CityCtrl from "../controllers/CityCtrl";


class CityRoutes {
  router = Router();
  cityCtrl = new CityCtrl();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
   
    this.router.route("/").get(this.cityCtrl.getAllCities);
    this.router.route("/:id").get(this.cityCtrl.getCityById);
    this.router.route("/").post(this.cityCtrl.addCity);
    this.router.route("/:id").delete(this.cityCtrl.deleteCity);
    this.router.route("/:id").put(this.cityCtrl.updateCity);
  }
}
export default new CityRoutes().router;
