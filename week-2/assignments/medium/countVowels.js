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