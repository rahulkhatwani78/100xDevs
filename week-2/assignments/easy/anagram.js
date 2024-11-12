function isAnagram(str1, str2) {
  if (str1?.length != str2?.length) return false;
  const sortedStr1 = str1?.toLowerCase()?.split("")?.sort()?.join("");
  const sortedStr2 = str2?.toLowerCase()?.split("")?.sort()?.join("");
  return sortedStr1 === sortedStr2;
}

module.exports = isAnagram;
