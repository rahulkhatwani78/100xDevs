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
