//Find Minimum in Rotated Sorted Array
var findMin = function(nums) {
    let left  = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            // left half sorted, min in right half
            left = mid + 1;
        } else {
            // right half sorted, min in left half
            right = mid;
        }
    }

    return nums[left];
};
const arr = [3, 4, 5, 1, 2];

console.log(findMin(arr));