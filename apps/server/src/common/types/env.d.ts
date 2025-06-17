declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    BACKEND_PORT: string;
    JWT_LIFESPAN: string;
    TZ: string;
  }
}
