/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

const countVowels = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let vowelsCount = 0;
    str.toLowerCase().split('').forEach((letter) => {
        if (vowels.includes(letter)) {
            vowelsCount++;
        }
    })
    return vowelsCount;
}

module.exports = countVowels;