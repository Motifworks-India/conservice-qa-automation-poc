/**
 * page-setup.ts: This module is responsible for setting up the initial state of a page before each test.
 * It includes a hook that runs before each test, setting the page context. By centralizing these setup operations,
 * it ensures a consistent starting point for each test, improving test reliability. It also exports a base test object
 * with a beforeEach hook already set up. This can be used to define tests with the page context set up.
 */

import { Browser, test as baseTest, expect } from '@playwright/test';
import { getPage, setPageWithCache } from '../utils/page-utils';
import { getEnvironment } from 'utility/environment';

/**
 * A hook that runs before each test, setting the page context.
 * @param {Page} page - The page context provided by Playwright.
 */
baseTest.beforeEach(async ({ browser }: { browser: Browser }) => {
  // setPage(page);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const page = await browser.newPage();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  expect(await setPageWithCache(page)).toBe(true);
  const environment = getEnvironment();
  const envBool = environment == 'stage' || environment == 'dev';
  console.log(`Environment set as: ${environment}`);
  expect(envBool).toBe(true);
});

baseTest.afterEach(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await getPage().close();
});

// baseTest.afterAll(async () => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   await beforeAllPage.close();
// });

// baseTest.beforeAll(async ({ browser }: { browser: Browser }) => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   beforeAllPage = await browser.newPage();
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   expect(await setPageWithCache(beforeAllPage)).toBe(true);
// });

/**
 * The base test object with a beforeEach hook already set up.
 * This can be used to define tests with the page context set up.
 */
export const test = baseTest;
