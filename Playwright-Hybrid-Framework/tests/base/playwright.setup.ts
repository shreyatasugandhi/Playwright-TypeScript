import { ENV } from '../config/env.config';

export async function globalSetup() {
  process.env.BASE_URL = ENV.url;
}
