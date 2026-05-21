//  Promisify: Convert a callback-based function (err, value) into a Promise.

//old method woth callback

// function fetchData(callback) {
//   setTimeout(() => {
//     const success = true;

//     if (success) {
//       callback(null, "Data received");
//     } else {
//       callback("Request failed");
//     }
//   }, 1000);
// }

// fetchData((err, data) => {
//   if (err) {
//     console.error("Error:", err)
//     return
//   }

//   console.log("Success:", data)
// })
// with prom
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const success = true;

//       if (success) {
//         resolve("Data received");
//       } else {
//         reject("Request failed");
//       }
//     }, 1000);
//   });
// }

// fetchData()
//   .then((data) => {
//     console.log("Success:", data);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

// Same example with async/await

  function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve("Data received");
      } else {
        reject("Request failed");
      }
    }, 1000);
  });
}

async function run() {
  try {
    const data = await fetchData();
    console.log("Success:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();