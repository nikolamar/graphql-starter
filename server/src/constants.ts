import "dotenv-safe/config";

export const PORT = process.env.PORT || "";
export const DOMAIN = process.env.DOMAIN || "";
export const REDIS_URL = process.env.REDIS_URL || "";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const PROD = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "nikolatec";
export const FORGOT_PASSWORD_PREFIX = "forgot-password:";
export const USER = "USER" || "";
export const ADMIN = "ADMIN" || "";
export const NODEMAILER_USER = process.env.NODEMAILER_USER || "";
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || "";
