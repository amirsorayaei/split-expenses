/**
 * Convert all digits in a string to english
 * @param {string} num
 * @returns {string}
 */
export const convertToEnglishDigit = (num: string): string => {
  return num
    .replace(/[\u0660-\u0669]/g, (c) => (c.charCodeAt(0) - 0x0660).toString())
    .replace(/[\u06f0-\u06f9]/g, (c) => (c.charCodeAt(0) - 0x06f0).toString());
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const removeWhiteSpaceFromString = (str: string): string => {
  return str && str.split(/\s+/).join("");
};

/**
 * Generate unique ID
 * @param {any[]} list
 * @returns {number}
 */
export const generateUniqueID = (list: any[]): number => {
  const lastItem = list.at(-1); // Get the last item of given list
  const generatedID = lastItem ? lastItem.id + 1 : 1; // Generate unique ID
  return generatedID;
};