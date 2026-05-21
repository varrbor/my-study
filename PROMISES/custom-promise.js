class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = value;

      this.onFulfilledCallbacks.forEach(fn => fn(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.reason = reason;

      this.onRejectedCallbacks.forEach(fn => fn(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(value);
            resolve(result);
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(reason);
            resolve(result);
          } else {
            reject(reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "fulfilled") {
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === "rejected") {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
//usage
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello Custom Promise");
  }, 1000);
});

p.then(res => {
  console.log(res);
  return "Next step";
}).then(console.log);