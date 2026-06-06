var productExceptSelf = function(nums) {
    const n = nums.length;
    const prefix = new Array(n).fill(1);
    const suffix = new Array(n).fill(1);
    const result = new Array(n);

    // build prefix products
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] * nums[i-1];
    }

    // build suffix products
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i+1] * nums[i+1];
    }

    // multiply prefix × suffix
    for (let i = 0; i < n; i++) {
        result[i] = prefix[i] * suffix[i];
    }

    return result;
};


const arr = [1, 2, 3, 4];

console.log(productExceptSelf(arr));