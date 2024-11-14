/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

const isPalindrome = (str1) => {
  const filteredStr = str1
    .toLowerCase()
    .split("")
    .filter((char) => {
      if (
        char !== "?" &&
        char !== " " &&
        char !== "!" &&
        char !== "." &&
        char !== ","
      ) {
        return char;
      }
    })
    .join("");
  const reversedStr = filteredStr.split("").reverse().join("");
  return filteredStr === reversedStr;
};

module.exports = isPalindrome;
