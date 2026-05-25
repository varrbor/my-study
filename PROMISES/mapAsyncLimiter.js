// Map Async Limit: Process an array of async tasks in chunks (Limit parallelism
// 🧠 Map Async Limit

// Map Async Limit означає:

// 👉 запускати async задачі не всі одразу, а лише певну кількість паралельно.

// Це корисно для:

// API rate limits
// database connections
// scraping
// queue systems
// avoiding overload
    async function mapAsyncLimit(arr, limit, asyncFn) {
  const results = [];

  for (let i = 0; i < arr.length; i += limit) {
    const chunk = arr.slice(i, i + limit);

    const chunkResults = await Promise.all(
      chunk.map(asyncFn)
    );

    results.push(...chunkResults);
  }

  return results;
}

// usage
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function double(n) {
  await delay(1000);

  console.log("Processing", n);

  return n * 2;
}

mapAsyncLimit([1,2,3,4,5,6], 2, double)
  .then(console.log);