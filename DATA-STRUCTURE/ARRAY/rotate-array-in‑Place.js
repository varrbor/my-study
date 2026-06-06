//Rotate Array In‑Place
var rotate = function(nums, k) {
    const n = nums.length;
    k = k % n;  // handle k > n

    reverse(nums, 0, n - 1);      // reverse whole array
    reverse(nums, 0, k - 1);      // reverse first k elements
    reverse(nums, k, n - 1);      // reverse rest

    function reverse(arr, left, right) {
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
};
const arr = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

rotate(arr, k);
console.log(arr);