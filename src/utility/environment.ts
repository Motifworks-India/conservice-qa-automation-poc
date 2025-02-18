//function to set up the required environment to run test

export function getEnvironment(): string {
  const environment = process.env.TARGET_ENV ?? 'dev';
  if (!environment) {
    throw new Error('Environment is not defined');
  }
  return environment;
}
