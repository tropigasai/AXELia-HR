import 'dotenv/config';
export function getEnv() {
  const required = ['CODY_API_KEY'];
  required.forEach((v) => {
    if (!process.env[v]) throw new Error(`Missing env var ${v}`);
  });
  return {
    CODY_API_KEY: process.env.CODY_API_KEY as string,
  };
}
