// implamentation
async function asyncPriority(tasks) {

  // Sort highest priority first
  const sorted = [...tasks].sort(
    (a, b) => b.priority - a.priority
  );

  const errors = [];

  for (const task of sorted) {
    try {

      const result = await task.promise();

      return result;

    } catch (err) {

      errors.push(err);
    }
  }

  throw new Error("All promises failed");
}

// usage
function createTask(name, shouldFail, delay) {
  return () =>
    new Promise((resolve, reject) => {

      setTimeout(() => {

        if (shouldFail) {
          reject(`${name} failed`);
        } else {
          resolve(`${name} success`);
        }

      }, delay);

    });
}

// test
asyncPriority([
  {
    priority: 1,
    promise: createTask("Low", false, 1000),
  },
  {
    priority: 3,
    promise: createTask("High", true, 500),
  },
  {
    priority: 2,
    promise: createTask("Medium", false, 700),
  },
])
.then(console.log)
.catch(console.error);