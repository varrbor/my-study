class CarDatabase {
  addCar(car) {
    console.log("Car added:", car)
  }

  removeCar(id) {
    console.log("Car removed:", id)
  }
}
class CarDatabaseProxy {
  constructor(userRole) {
    this.userRole = userRole
    this.realDb = new CarDatabase()
  }

  addCar(car) {
    if (this.userRole !== "admin") {
      console.log("Access denied: only admin can add cars")
      return
    }

    console.log("LOG: Adding car...")
    this.realDb.addCar(car)
  }

  removeCar(id) {
    if (this.userRole !== "admin") {
      console.log("Access denied: only admin can remove cars")
      return
    }

    console.log("LOG: Removing car...")
    this.realDb.removeCar(id)
  }
}
const adminDb = new CarDatabaseProxy("admin")
const userDb = new CarDatabaseProxy("user")

adminDb.addCar({ model: "Audi A4", year: 2020 })
// LOG: Adding car...
// Car added: { model: 'Audi A4', year: 2020 }

userDb.addCar({ model: "BMW X5", year: 2019 })
// Access denied: only admin can add cars
