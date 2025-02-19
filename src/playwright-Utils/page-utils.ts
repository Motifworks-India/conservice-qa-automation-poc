/**
 * page-factory.ts: This module is responsible for setting and managing instances of pages.
 * It provides a centralized way to set and access pages, ensuring that each test has a clean, isolated page instance.
 * This helps to maintain the state and context of each test independently, improving test reliability and debugging.
 * It also includes functions for switching between pages, closing pages, and reverting to the default page.
 */

import { KeyboardPressOptions } from '../../config/ui/optional-parameter-types';
import { SMALL_TIMEOUT } from '../constants/timeout-constants';
import { Response, Page } from '@playwright/test';
import { unlinkSync } from 'fs';
import { get, set } from '../../config/ui/cache';

let page: Page;

/**
 * Returns the current Page.
 * @returns {Page} The current Page.
 */
export function getPage(): Page {
  const workerParallelIndex =
    typeof process.env.TEST_PARALLEL_INDEX === 'string' ? process.env.TEST_PARALLEL_INDEX : '0';
  return get(workerParallelIndex);
}

/**
 * Sets the current Page.
 * @param {Page} pageInstance - The Page instance to set as the current Page.
 */
export function setPage(pageInstance: Page): void {
  page = pageInstance;
}

export async function setPageTrue(pageInstance: Page): Promise<boolean> {
  let bool = false;
  try {
    page = pageInstance;
    //eslint-disable-next-line @typescript-eslint/await-thenable
    bool = (await page) === pageInstance;
  } catch (err) {
    console.error('Set Page Error: ', err);
  }
  return bool;
}

export async function setPageWithCache(pageInstance: Page): Promise<boolean> {
  let bool = false;
  const workerIndex: string =
    typeof process.env.TEST_PARALLEL_INDEX === 'string' ? process.env.TEST_PARALLEL_INDEX : '0';
  console.log(`Set Page Worker Index: ${workerIndex}`);
  try {
    page = pageInstance;
    //eslint-disable-next-line @typescript-eslint/await-thenable
    bool = (await page) === pageInstance;
    set(workerIndex, pageInstance);
  } catch (err) {
    console.error('Set Page Error: ', err);
  }
  return bool;
}

/**
 * Switches to a different page by its index (1-based).
 * If the desired page isn't immediately available, this function will wait and retry for up to 'SMALL_TIMEOUT' seconds.
 * @param {number} winNum - The index of the page to switch to.
 * @throws {Error} If the desired page isn't found within 'SMALL_TIMEOUT' seconds.
 */
export async function switchPage(winNum: number): Promise<void> {
  const page = getPage();
  const startTime = Date.now();
  while (page.context().pages().length < winNum && Date.now() - startTime < SMALL_TIMEOUT) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (page.context().pages().length < winNum) {
    throw new Error(`Page number ${winNum} not found after ${SMALL_TIMEOUT} seconds`);
  }
  const pageInstance = page.context().pages()[winNum - 1];
  // await pageInstance.waitForLoadState('domcontentloaded');
  setPage(pageInstance);
}

/**
 * Switches back to the default page (the first one).
 */
export async function switchToDefaultPage(): Promise<void> {
  const page = getPage();
  const pageInstance = page.context().pages()[0];
  if (pageInstance) {
    await pageInstance.bringToFront();
    setPage(pageInstance);
  }
}

/**
 * Closes a page by its index (1-based).
 * If no index is provided, the current page is closed.
 * If there are other pages open, it will switch back to the default page.
 * @param {number} winNum - The index of the page to close.
 */
export async function closePage(winNum: number): Promise<void> {
  const page = getPage();
  if (!winNum) {
    await page.close();
    return;
  }
  const noOfWindows = page.context().pages().length;
  const pageInstance = page.context().pages()[winNum - 1];
  await pageInstance.close();
  if (noOfWindows > 1) {
    await switchToDefaultPage();
  }
}

/**
 * Default Viewport Size
 * Incase of Null
 */
const VIEWPORT_SIZE = {
  width: 0,
  height: 0,
};
export type ViewportSize = typeof VIEWPORT_SIZE;

/**
 * Get Page ViewportSize
 * @returns Returns Page Viewport Size
 */
export function getPageViewPortSize(): ViewportSize {
  const pageSize = getPage().viewportSize();
  const viewportSize = pageSize === null ? VIEWPORT_SIZE : pageSize;
  return viewportSize;
}

/**
 * Presses Key on Keyboard on Page
 * @param {string} key - The key that is pressed
 * @param {KeyboardPressOptions} options - The options to pass to the press function.
 * https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
 */
export async function pageKeyboardPress(key: string, options?: KeyboardPressOptions) {
  await getPage().keyboard.press(key, options);
}
export async function pageKeyboardtype(key: string) {
  await getPage().keyboard.insertText(key);
}

export function removeFile(filePath: string): boolean {
  let bool = false;
  try {
    unlinkSync(filePath);
    bool = true;
  } catch (error) {
    bool = false;
  }
  return bool;
}

/**
 * Handles switching to a newly opened tab.
 */

export async function newTabHandle(element: any) {
  // Event listener to capture new tab handle
  const page: Page = getPage();
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 10000 }),
    element.click({ strict: true }),
  ]);

  const url: string = newPage.url();
  await page.goto(url);
  await newPage.close();
}

/**
 * Handles switching to a newly opened tab.
 * Waits for a new tab to be available and switches to it.
 */
export async function handleMultipleTabs(): Promise<void> {
  const page = getPage();
  const initialPages = page.context().pages().length;
  console.log('initail pages', initialPages); // Get the current number of open tabs
  let newPages;

  // Wait for a new tab to open
  const startTime = Date.now();
  while (Date.now() - startTime < SMALL_TIMEOUT) {
    newPages = page.context().pages();
    if (newPages.length > initialPages) {
      const newPage = newPages[newPages.length - 1]; // Get the newly opened tab
      await newPage.bringToFront(); // Switch focus to the new tab
      setPage(newPage); // Set the new tab as the current page instance
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100)); // Small wait before retrying
  }

  // If no new tab is detected within the timeout period
  throw new Error('No new tab found after waiting');
}

// Define the PlaywrightEventType union type

// A generic function to wait for events
export async function waitForResponseEvent(
  urlSubstring: string,
  method: string,
  options?: { timeout?: number }
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const page = getPage(); // Ensure to get the current page instance

    const responseHandler = (response: Response) => {
      if (response.url().includes(urlSubstring) && response.request().method() === method) {
        resolve(response);
        page.off('response', responseHandler); // Unsubscribe after handling
      }
    };

    page.on('response', responseHandler);

    // Optional timeout handling
    if (options?.timeout) {
      setTimeout(() => {
        page.off('response', responseHandler); // Unsubscribe to avoid memory leaks
        reject(new Error(`Timeout waiting for response from ${urlSubstring}`));
      }, options.timeout);
    }
  });
}
