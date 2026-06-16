// best time to buy and sell stock

const maxProfit = function (prices) {
  let min = Infinity;
  let max = -Infinity;
  let profit = 0;
  for (const price of prices) {
    if (price < max) {
      profit += max - min;
      min = price;
      max = price;
    }
    min = Math.min(min, price);
    max = Math.max(max, price);
  }
  if (max > 0) {
    profit += max - min;
  }
  return profit;
};
console.log(maxProfit([10, 18, 4, 5, 9, 6, 16, 12]));