function findLargestElement(nums) {
  let largestNum = nums[0];
  nums.forEach((num) => {
    if (num > largestNum) largestNum = num;
  });
  return largestNum;
}

module.exports = findLargestElement;
