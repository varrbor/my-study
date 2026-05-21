// Promise Merge: Implement a function that merges mutiple promises into a single value.

function promiseMerge(promises, mergeFn) {
  return Promise.all(promises).then(results => {
    return mergeFn(results);
  });
}
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

promiseMerge([p1, p2, p3], (values) => {
  return values.reduce((sum, v) => sum + v, 0);
}).then(console.log);