// class MySQLDatabase {
//   connect() {
//     console.log("MySQL connected");
//   }
// }

// class App {
//   constructor() {
//     this.db = new MySQLDatabase();
//   }
// }

class MySQLDatabase {
  connect() {
    console.log("MySQL connected");
  }
}

class MongoDatabase {
  connect() {
    console.log("MongoDB connected");
  }
}

class App {
  constructor(database) {
    this.db = database;
  }

  start() {
    this.db.connect();
  }
}

const app = new App(new MongoDatabase());
app.start();