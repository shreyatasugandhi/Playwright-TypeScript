import env from './test-env.json';

type EnvConfig = {
  url: string;
  username: string;
  password: string;
};

type EnvMap = {
  qa: EnvConfig;
};

const environment = (process.env.TEST_ENV as keyof EnvMap) || 'qa';

export const ENV: EnvConfig = env[environment];
