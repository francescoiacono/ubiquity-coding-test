/**
 * Formats the value by multiplying it by 100 and fixing it to 2 decimal places.
 *
 * @param value - The value to be formatted.
 * @returns The formatted value as a string.
 */
export const decimalToPercentage = (value: number) => {
  return (value * 100).toFixed(2);
};
