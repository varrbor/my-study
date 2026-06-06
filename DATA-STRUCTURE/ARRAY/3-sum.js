//3Sum (Find All Triplets Summing to Zero)


var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {

        // skip duplicates for i
        if (i > 0 && nums[i] === nums[i-1]) continue;

        // if smallest possible sum > 0 → stop
        if (nums[i] > 0) break;

        let left  = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // skip duplicates for left and right
                while (left < right && nums[left]  === nums[left+1])  left++;
                while (left < right && nums[right] === nums[right-1]) right--;

                left++;
                right--;

            } else if (sum < 0) {
                left++;   // need bigger sum
            } else {
                right--;  // need smaller sum
            }
        }
    }

    return result;
};

const arr = [-1, 0, 1, 2, -1, -4];

console.log(threeSum(arr)); 