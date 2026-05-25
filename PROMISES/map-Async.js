async function mapAsync(arr, asyncFn) {
  return Promise.all(arr.map(asyncFn));
}

const numbers = [1, 2, 3];

async function double(n) {
  return n * 2;
}

mapAsync(numbers, double).then(console.log);
