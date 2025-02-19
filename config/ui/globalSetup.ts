import { chromium } from '@playwright/test';
import dotenv from 'dotenv'; // Import dotenv here
import path from 'path';

// Global setup function to set up base URL as per target environment passed on CLI
async function globalSetup() {
  const env_name = process.env.TARGET_ENV ?? 'dev';
  // Use path.join() for cross-platform compatibility (Windows/Linux/macOS)
  const envFilePath = path.join('env', `.env.${env_name}`);
  console.log('Loading environment variables from:', envFilePath);
  dotenv.config({
    path: envFilePath, // Cross-platform path to environment file
    override: true,
  });
  console.log('GS username is ', process.env.TEST_USER);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  console.log('url is', process.env.BASE_URL);
  await page.goto(process.env.BASE_URL!);
  await page.locator('[data-test="username"]').fill(process.env.TEST_USER!);
  await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
  await page.locator('[data-test="login-button"]').click();
  await page.context().storageState({ path: 'login.json' });
  console.log('GS1 login is ', 'login.js');
  await page.close();
}

export default globalSetup;
