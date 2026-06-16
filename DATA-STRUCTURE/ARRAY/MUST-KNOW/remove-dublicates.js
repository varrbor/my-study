// remove dublicatats

const arr = [1, 1, 2, 2, 2, 3, 3, 4];
var removeDuplicates = function (nums) {
  var unique = [];
  for (let i = 0; i < nums.length; i++) {
    console.log(i, unique.indexOf(nums[i]) )
    if (unique.indexOf(nums[i]) === -1) {
      unique.push(nums[i]);
    }
  }
  return unique;
};
console.log(removeDuplicates(arr));

// var removeDuplicates = function(nums) {
//   return [...new Set(nums)];
// };
