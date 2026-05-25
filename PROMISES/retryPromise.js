// Retry Promise: Retry a failed promise N times with a delay.
function retryPromise(fn, retries, delay) {
  return new Promise((resolve, reject) => {

    async function attempt() {
      try {
        const result = await fn();

        resolve(result);

      } catch (error) {

        if (retries === 0) {
          reject(error);
          return;
        }

        retries--;

        console.log(`Retrying... attempts left: ${retries}`);

        setTimeout(attempt, delay);
      }
    }

    attempt();
  });
}

// fake API

let count = 0;

async function fetchData() {
  count++;

  console.log("Attempt:", count);

  if (count < 3) {
    throw new Error("Failed");
  }

  return "Success!";
}
// usage
retryPromise(fetchData, 5, 1000)
  .then(console.log)
  .catch(console.error);