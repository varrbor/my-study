class Ball {
  roll() {
    return `The ${this.type} is rolling`;
  }
}

// Products
class Football extends Ball {
  constructor() {
    super();
    this.type = "football";
  }

  kick() {
    return "You kicked the football";
  }
}

class Basketball extends Ball {
  constructor() {
    super();
    this.type = "basketball";
  }

  bounce() {
    return "You bounced the basketball";
  }
}

// Creator
class BallFactory {
  createBall() {
    throw new Error("createBall() must be implemented");
  }

  play() {
    const ball = this.createBall();

    console.log(ball.roll());
  }
}

// Concrete Factories
class FootballFactory extends BallFactory {
  createBall() {
    return new Football();
  }
}

class BasketballFactory extends BallFactory {
  createBall() {
    return new Basketball();
  }
}

// Usage
const footballFactory = new FootballFactory();
const football = footballFactory.createBall();

console.log(football.roll());
console.log(football.kick());

const basketballFactory = new BasketballFactory();
const basketball = basketballFactory.createBall();

console.log(basketball.roll());
console.log(basketball.bounce());