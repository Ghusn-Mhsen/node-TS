import RateLimit from "express-rate-limit";

const env = process.env.NODE_ENV || "dev";
const rateLimitRequest = Number(process.env.RATE_LIMIT_REQUEST) || 100;
const rateLimitTime = Number(process.env.RATE_LIMIT_TIME) || 15;

export default () => {
  const rateLimitConfig = {
    windowMs: rateLimitTime * 60 * 1000, // 15 minutes
    max: rateLimitRequest, // limit each IP to 100 requests per windowMs by default
    delayMs: 0,
    handler: "Rate limit exceeded, please try again later.",
  };

  if (env === "production") {
    rateLimitConfig.max = rateLimitRequest; // override the max requests per windowMs for production
  } else {
    rateLimitConfig.windowMs = 5 * 60 * 1000; // 5 minutes for non-production environment
    rateLimitConfig.max = 3000; // limit each IP to 3000 requests per windowMs for non-production
  }

  return new RateLimit(rateLimitConfig);
};
