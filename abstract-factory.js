//
// PRODUCTS
//

class Football {
  play() {
    return "Playing football";
  }
}

class Basketball {
  play() {
    return "Playing basketball";
  }
}

class FootballShoes {
  wear() {
    return "Wearing football shoes";
  }
}

class BasketballShoes {
  wear() {
    return "Wearing basketball shoes";
  }
}

//
// ABSTRACT FACTORY
//

class SportsFactory {
  createBall() {
    throw new Error("createBall() must be implemented");
  }

  createShoes() {
    throw new Error("createShoes() must be implemented");
  }
}

//
// CONCRETE FACTORIES
//

class FootballFactory extends SportsFactory {
  createBall() {
    return new Football();
  }

  createShoes() {
    return new FootballShoes();
  }
}

class BasketballFactory extends SportsFactory {
  createBall() {
    return new Basketball();
  }

  createShoes() {
    return new BasketballShoes();
  }
}

//
// USAGE
//

function createSportSet(factory) {
  const ball = factory.createBall();
  const shoes = factory.createShoes();

  console.log(ball.play());
  console.log(shoes.wear());
}

const footballFactory = new FootballFactory();
createSportSet(footballFactory);

const basketballFactory = new BasketballFactory();
createSportSet(basketballFactory);