/**
 * Formats the given date string into a relative date string.
 *
 * This function calculates the difference between the current date and the provided date,
 * returning a string that describes the difference in days. For example, if the provided
 * date is today, it returns "today". If the provided date is one day ago, it returns "1 day ago".
 *
 * @param {string} inputDate - The date string to format.
 * @returns {string} A string representing the relative date.
 */
export function formatRelativeDate(inputDate: string): string {
  /** Current date and time */
  const currentDate: Date = new Date();

  /** Date object from the provided input date string */
  const providedDate: Date = new Date(inputDate);

  /** Time difference in milliseconds between the current date and the provided date */
  const timeDifference: number = currentDate.getTime() - providedDate.getTime();

  /** Time difference in days, rounded down to the nearest whole number */
  const daysDifference: number = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24),
  );

  /**
   * Determine the appropriate string to return based on the days difference.
   * If the difference is 0 days, return "today". Otherwise, return the difference in days.
   */
  if (daysDifference === 0) {
    return "today";
  } else {
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }
}
