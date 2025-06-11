declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT: string;
    TZ: string;
  }
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AuthInfo {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User {
      username: string;
    }
  }
}
