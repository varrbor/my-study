var subarraySum = function(nums, k) {
    const map = new Map();
    map.set(0, 1);  // empty prefix

    let count = 0;
    let sum   = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        // if (sum - k) exists in map
        // there's a subarray ending here that sums to k
        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }

        map.set(sum, (map.get(sum) || 0) + 1);
    }

    return count;
};

const arr = [1, 1, 1];
const k = 2;

console.log(subarraySum(arr, k));