declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    REDIS_URL: string;
    CORS_ORIGIN: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    DATABASE_URL: string;
    DOMAIN: string;
    NODEMAILER_USER: string;
    NODEMAILER_PASSWORD: string;
  }
}
