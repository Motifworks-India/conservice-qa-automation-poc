// eslint-disable-next-line import/no-unresolved
import moment from 'moment';

export function convertIsoDateToSlashMMDDYY(IsoDate: string): string {
  const dateSplit = IsoDate.substring(0, 10).split('-');
  return `${dateSplit[1].replace(/^0+/, '')}/${dateSplit[2]}/${dateSplit[0].substring(2)}`;
}

export function convertIsoDateToFormat(IsoDate: string, dateFormat?: string): string {
  const dateFormatSet = typeof dateFormat === 'string' ? dateFormat : 'DD/M/YY';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return moment(IsoDate).format(dateFormatSet);
}

export function getCurrentDate(): string {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function getCurrentMonth(): string {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based

  return month;
}

export function getFirstFutureDateByMonth(dates: string[]): string | null {
  const currentMonth = new Date().getMonth() + 1; // Get current month (0-based, so add 1)
  console.log('current month', currentMonth);
  console.log('dates are', dates);
  for (const date of dates) {
    const month = parseInt(date.split('/')[0], 10); // Extract month from the date
    console.log('month is', month);
    if (month > currentMonth) {
      return date; // Return the first date with a later month
    }
  }

  return null; // If no future date based on month is found
}

export function getNextMonthDate(dates: string[]): string | null {
  const currentMonth = new Date().getMonth() + 1; // Get current month (0-based, so add 1)
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1; // Handle wrapping to January

  for (const date of dates) {
    const month = parseInt(date.split('/')[0], 10); // Extract month from the date

    if (month === nextMonth) {
      return date; // Return the first date in the next month
    }
  }

  return null; // If no date is found in the next month
}

export function getNextAvailableDate(dates: string[]): string | null {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const nextMonth = (currentMonth + 1) % 12;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const targetDates = dates
    .map(dateStr => new Date(dateStr)) // Parse each date string
    .filter(date => date > currentDate) // Filter out past dates
    .sort((a, b) => a.getTime() - b.getTime()); // Sort by closest upcoming date
  
  // Look for immediate next month
  for (const date of targetDates) {
    if (date.getMonth() === nextMonth && date.getFullYear() === nextYear) {
      return formatDate(date);
    }
  }

  // If immediate next month is unavailable, return the earliest available date
  return targetDates.length > 0 ? formatDate(targetDates[0]) : null;
}

// Helper function to format date as MM/DD/YYYY
function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
}


// export function getNextAvailableDate(dates: string[]): string | null {
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();

//   const nextMonth = (currentMonth + 1) % 12;
//   const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

//   const targetDates = dates
//     .map((dateStr) => new Date(dateStr)) // Parse each date string
//     .filter((date) => date > currentDate) // Filter out past dates
//     .sort((a, b) => a.getTime() - b.getTime()); // Sort by closest upcoming date

//   // Look for immediate next month
//   for (const date of targetDates) {
//     if (date.getMonth() === nextMonth && date.getFullYear() === nextYear) {
//       return date.toLocaleDateString();
//     }
//   }

//   // If immediate next month is unavailable, return the earliest available date
//   return targetDates.length > 0 ? targetDates[0].toLocaleDateString() : null;
//   // const currentDate = new Date();

//   // // Function to format the date as MM/DD/YYYY
//   // const formatDate = (date: Date): string => {
//   //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
//   //   const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
//   //   const year = date.getFullYear();
//   //   return `${month}/${day}/${year}`;
//   // };

//   // // Get next month's date
//   // const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
//   // const nextMonthDateString = formatDate(nextMonth);

//   // // Check if the next month's date exists in the list
//   // if (datesList.includes(nextMonthDateString)) {
//   //   return nextMonthDateString; // Return next month's date if found
//   // }

//   // // If not found, get the date for the month after next
//   // const monthAfterNext = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
//   // const monthAfterNextDateString = formatDate(monthAfterNext);

//   // // Return month after next's date
//   // return monthAfterNextDateString;
// }
