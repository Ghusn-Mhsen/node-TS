import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Application } from "express";
import Database from "./db/db";
import Server from "./index";

async function startServer() {
  try {
    Database.connect();
    const app: Application = express();
   
    const server: Server = new Server(app);
    const port: number = process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000;

    app
      .listen(port, "localhost", function () {
        console.info(`Server running on : http://localhost:${port}`);
      })
      .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          console.log("server startup error: address already in use");
        } else {
          console.log(err);
        }
      });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    // Handle the error gracefully, e.g., exit the application
    process.exit(1);
  }
}

startServer();
