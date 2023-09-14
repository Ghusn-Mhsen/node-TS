import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

class Database {
  constructor() {
    console.log("Database class constructor called");
   
  }

  connect(): void {
   

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error("DATABASE_URL is not defined");
      process.exit(1);
    }

    console.log(`Connecting to database: ${databaseUrl}`);

    mongoose
      .connect(databaseUrl)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.log(err);
        console.error("Database connection error");
        process.exit(1);
      });
  }
}
export default new Database();
