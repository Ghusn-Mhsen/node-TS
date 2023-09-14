import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"; // Import specific error types
import config from "../config/jwt";
import { HttpStatus } from "../utils/httpStatus";

declare global {
  namespace Express {
    interface Request {
      bearerToken?: string;
      tokenInfo?: {
        _id: string;
        role: string;
      
      };
    }
  }
}

function checkAccess(role: string, path: string): boolean {
  // TODO: Implement logic to check user's role and authorization for the given path
  return true;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(HttpStatus.UNAUTHORIZED.code).json({
      statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
      message: "No token provided",
    });

  const arrayAuth = authHeader.split(" ");

  
  if (arrayAuth.length !== 2 || arrayAuth[0] !== "Bearer")
    return res.status(HttpStatus.UNAUTHORIZED.code).json({
      statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
      message: "The provided token is invalid",
    });

  const token = arrayAuth[1];
  req.bearerToken = token;
 
  

  try {
   
    const decoded: any = jwt.verify(token, config.secret);

    if (!checkAccess(decoded.role, req.path)) {
      return res.status(HttpStatus.UNAUTHORIZED.code).json({
        statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
        message: HttpStatus.UNAUTHORIZED.description,
      });
    }


    // Assign decoded token information to the request object
    req.tokenInfo = {
      _id: decoded._id,
      role: decoded.role,
      
    };

    next();
  } catch (err) {
    let error: string;
    if (err instanceof TokenExpiredError) {
      error = "Expired token";
    } else if (err instanceof JsonWebTokenError) {
      error = "Invalid token";
    } else {
      error = "Unknown error"; // Handle other errors as needed
    }

    return res.status(HttpStatus.UNAUTHORIZED.code).json({
      statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
      message: error,
    });
  }
};
