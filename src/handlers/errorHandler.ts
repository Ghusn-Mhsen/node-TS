import * as winston from "winston";
import * as dotenv from "dotenv";


dotenv.config();

// date + logger level + message
const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

class LoggerService {
  route: string;
  logger: winston.Logger;

    dateFormat (){
        return new Date(Date.now()).toLocaleString();
      };

  constructor(route: string) {
    this.route = route;
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf(
        (info) => `${this.dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | ${info.obj ? `DATA: ${JSON.stringify(info.obj)} | ` : ''}`
      ),
      transports: [
       new winston.transports.Console(),
        new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${route}.log` }),
      ],
    });
    this.logger = logger;
  }

  async info(message:string, obj:any) {
    if (obj) {
      this.logger.log('info', message, { obj });
    } else {
      this.logger.log('info', message);
    }
  }

  async error(message:string, obj:any) {
    if (obj) {
      this.logger.log('error', message, { obj });
    } else {
      this.logger.log('error', message);
    }
  }

  async debug(message:string, obj:any) {
    if (obj) {
      this.logger.log('debug', message, { obj });
    } else {
      this.logger.log('debug', message);
    }
  }
}
export default   LoggerService;


