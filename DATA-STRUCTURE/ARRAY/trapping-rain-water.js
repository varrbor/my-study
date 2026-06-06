//Trapping Rain Water

var trap = function(height) {
    let left  = 0;
    let right = height.length - 1;

    let maxLeft  = 0;
    let maxRight = 0;
    let total    = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= maxLeft) {
                maxLeft = height[left];  // update max
            } else {
                total += maxLeft - height[left];  // trap water
            }
            left++;
        } else {
            if (height[right] >= maxRight) {
                maxRight = height[right];  // update max
            } else {
                total += maxRight - height[right];  // trap water
            }
            right--;
        }
    }

    return total;
};

const arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

console.log(trap(arr));