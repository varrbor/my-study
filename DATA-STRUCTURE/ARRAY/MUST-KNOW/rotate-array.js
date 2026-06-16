// rotate array O(n*k)

const arr = [1,2,3,4,5,6,7]

var rotate = function(nums, numberOfShifts)  {
  let tmp = 0;
  const leng = nums.length;
  // numberOfShifts = numberOfShifts % leng;
  // console.log(numberOfShifts)
  for (let i = 0; i < numberOfShifts; i++) {
     tmp = nums.pop();
     console.log('tmp', tmp)
     nums.unshift(tmp);
  }
 return nums;
};

console.log(rotate(arr, 3))


// O(n) time complexity and O(1) space complexity solution:

// var rotate = function(nums, k) {
//     k = k % nums.length;

//     reverse(nums, 0, nums.length - 1);
//     reverse(nums, 0, k - 1);
//     reverse(nums, k, nums.length - 1);

//     return nums;
// };

// function reverse(arr, l, r) {
//     while (l < r) {
//         [arr[l], arr[r]] = [arr[r], arr[l]];
//         l++;
//         r--;
//     }
// }
