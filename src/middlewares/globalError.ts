import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle and log the error
  console.error(err.stack);

  // Determine the response status and message based on the error
  const status = (err as any).status || 500;
  const message = err.message || "Internal Server Error";

  // Respond with the appropriate error message and status code
  res.status(status).json({ status:status, error: message });
};

export default errorHandler;
