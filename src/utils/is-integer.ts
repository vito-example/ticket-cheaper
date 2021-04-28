/**
 * @desc Check if value is integer
 * @param value - value: input string
 * @return {boolean} - True if the string is an integer, otherwise, false.
 */
export const isInteger = (value: string) => {
    return String(Math.floor(Number(value))) === value;
}