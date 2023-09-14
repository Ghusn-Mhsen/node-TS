import { Application } from 'express';
import cityRouter from './CityRoutes';
import auth from "../middlewares/auth";


export default class Routes {

  constructor(app: Application) {

    // city router
    //TODO : Do NOT ADD outh MiddleWare Until We Create User Model and Generate Token   

    
  //  app.use(auth);
    app.use("/api/city",cityRouter);
    
  }
}
