var maxSubArray = function (nums) {
  let maxSum = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // either extend current subarray or start fresh
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }

  return maxSum;
};

const strs = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(maxSubArray(strs));