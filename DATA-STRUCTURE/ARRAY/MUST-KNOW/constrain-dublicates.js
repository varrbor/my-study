// Contains Duplicate
const a =[1,2,3,4, 4];

var containsDuplicate = function(nums) {
  const seen = [];

  for (let i = 0; i < nums.length; i++) {
    if (seen.includes(nums[i])) {
      return true;
    }
    seen.push(nums[i]);
  }

  return false;
};


console.log(containsDuplicate(a));