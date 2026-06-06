// Longest Consecutive Sequence
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let longest = 0;

    for (let num of set) {
        // only start counting from sequence START
        if (!set.has(num - 1)) {
            let current = num;
            let streak  = 1;

            while (set.has(current + 1)) {
                current++;
                streak++;
            }

            longest = Math.max(longest, streak);
        }
    }

    return longest;
};

const arr = [100, 4, 200, 1, 3, 2];

console.log(longestConsecutive(arr));