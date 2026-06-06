//Sliding Window Maximum

var maxSlidingWindow = function(nums, k) {
    const result = [];
    const deque  = [];  // stores INDICES, not values
                        // front = largest, back = smallest

    for (let i = 0; i < nums.length; i++) {

        // 1. remove indices outside window
        if (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }

        // 2. remove smaller elements from back
        // they can never be max while current exists
        while (deque.length && nums[deque[deque.length-1]] < nums[i]) {
            deque.pop();
        }

        // 3. add current index
        deque.push(i);

        // 4. record max when first window complete
        if (i >= k - 1) {
            result.push(nums[deque[0]]);  // front is always max
        }
    }

    return result;
};

const arr = [1,3,-1,-3,5,3,6,7];
const k = 3;

console.log(maxSlidingWindow(arr, k));