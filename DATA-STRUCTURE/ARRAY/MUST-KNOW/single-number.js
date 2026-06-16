
// Single Number
const arr = [1,2,1,2]
var singleNumber = function(nums) {
  const sorted = nums.sort()
  console.log('sorted', sorted)
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i-1] !== sorted[i] && sorted[i+1] !== sorted[i]) {
        return sorted[i]
      }
    }
  }

console.log(singleNumber(arr) )


//XOR
// o(n) time complexity and O(1) space complexity solution:
var singleNumber = function(nums) {
  let result = 0;
  for (const n of nums) {
    result ^= n;   // XOR
  }
  return result;
};
