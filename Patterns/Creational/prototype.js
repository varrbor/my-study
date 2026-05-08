const animal = {
  eats: true,
  walk() {
    console.log("Animal walks")
  }
}

const dog = Object.create(animal)
dog.bark = function () {
  console.log("Woof!")
}

dog.walk() // inherited from prototype
dog.bark() // own method
