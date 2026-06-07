// class Worker {
//   work() {}
//   eat() {}
// }

// class Robot extends Worker {
//   eat() {
//     throw new Error("Robot doesn't eat");
//   }
// }

class HumanWorker {
  work() {
    console.log("Working");
  }

  eat() {
    console.log("Eating");
  }
}

class RobotWorker {
  work() {
    console.log("Working");
  }
}