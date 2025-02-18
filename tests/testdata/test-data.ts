export const CONSERVICE_URLS = {
  //baseUrl: (env: string) => conServiceUrlByEnv(env, `https://www.saucedemo.com/`)
  baseUrl: (env: string) => process.env.BASE_URL ? process.env.BASE_URL : `Setup ConService Url for Env: ${env}`
};

// function conServiceUrlByEnv(env: string, url: string): string {
//   if (env === 'dev') {
//     return url.replace('staging', 'dev');
//   }
//   if (env === 'stage') {
//     return url;
//   }
//   return `Setup ConService Url: ${url} for Env: ${env}`;
// }

export const USER_INFO = {
  username: process.env.TEST_USER,
  password: process.env.PASSWORD,
  PROJECT_KEY: 'BPORT',
  PROJECT_NAME: 'Fusion 3.0 Regression Tests',
  VERSION: '',
  JIRA_KEY: '',
  CYCLE: 'Fusion 3.0 UI Tests',
};
