import { faker } from '@faker-js/faker';

/**
 * Generates dates as per api contract
 */
export function generateDateWithISO(days: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
}

/**
 * Generates dates with 2024-01-29T23:59:59 also called ISO 8601 date and time format
 */
export function getDateWithISO8601(offset: number): string {
  const now = new Date();
  now.setDate(now.getDate() + offset);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

/**
 * Generates Random Number Sequence
 * @param {number} lengthOfNumSequence Length of the random number sequence to be returned
 * @returns {string} Returns a string of random numbers at input length
 */
export function getRandomNumberSequence(lengthOfNumSequence: number): string {
  const randomNumberSequence = Math.random()
    .toString()
    .slice(2, 2 + lengthOfNumSequence);
  return randomNumberSequence;
}

/**
 * Generates Random 10 Digit Phone Number
 * @returns {string} Returns ex: 123-456-7890 phone number pattern with randomized numbers
 */
export function getRandom10DigitPhoneNumber(): string {
  return faker.helpers.fromRegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/);
}

export function ifNullReturnEmptyString(input: string | number | null): string {
  return input === null ? '' : input.toString();
}
