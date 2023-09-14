import { Application, urlencoded, json } from "express";
import * as morgan from "morgan";
import * as fs from "fs";
import { WriteStream } from "fs";
import * as path from "path";
import helmet from "helmet";
import * as winston from "winston";
import cors from "cors";
import errorHandler from "./middlewares/globalError";

import Routes from "./routes";
import rateLimiter from "./middlewares/rateLimit";
//import { unCoughtErrorHandler } from "./handlers/errorHandler";

export default class Server {
  constructor(app: Application) {
    this.config(app);
  
    new Routes(app);
  }

  public config(app: Application): void {
    const accessLogStream: WriteStream = fs.createWriteStream(
      path.join(__dirname, "./logs/access.log"),
      { flags: "a" }
    );

    app.use(cors());
    app.use(json());
    //app.use(morgan("combined", { stream: accessLogStream }));
    app.use(urlencoded({ extended: true }));
    app.use(helmet());
app.use(errorHandler);

    //app.use(rateLimiter()); //  apply to all requests 
   //app.use(unCoughtErrorHandler);
    

    // // Enable CORS for all routes
    // app.use((req, res, next) => {
    //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //   next();
    // });
  }
}

process.on("beforeExit", function (err) {
  winston.error(JSON.stringify(err));
  console.error(err);
});
