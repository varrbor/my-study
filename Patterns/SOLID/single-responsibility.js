// class OrderService {
//   create(order) {
//     // VALIDATION
//     if (!order.items || order.items.length === 0) {
//       throw new Error("Order must contain at least one item");
//     }
//     if (!order.userEmail.includes("@")) {
//       throw new Error("Invalid email");
//     }

//     // SAVE TO DB
//     console.log("Saving order to database...");
//     console.log("Order saved:", order);

//     // SEND EMAIL
//     console.log(`Sending email to ${order.userEmail}: "Your order was created!"`);

//     // LOGGING
//     console.log("[INFO] Order created successfully");
//   }
// }

// // RUN
// const order = {
//   userEmail: "customer@example.com",
//   items: [
//     { id: 1, name: "Laptop", price: 3000 },
//     { id: 2, name: "Mouse", price: 100 }
//   ]
// };

new OrderService().create(order);


// 1. Validator — ONE responsibility: validate order
class OrderValidator {
  static validate(order) {
    if (!order.items || order.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }
    if (!order.userEmail.includes("@")) {
      throw new Error("Invalid email");
    }
  }
}

// 2. Repository — ONE responsibility: save order
class OrderRepository {
  save(order) {
    console.log("Saving order to database...");
    // Fake DB save
    console.log("Order saved:", order);
  }
}

// 3. NotificationService — ONE responsibility: send notifications
class NotificationService {
  sendOrderCreated(email) {
    console.log(`Sending email to ${email}: "Your order was created!"`);
  }
}

// 4. Logger — ONE responsibility: logging
class Logger {
  info(message) {
    console.log(`[INFO] ${message}`);
  }
}

// 5. OrderService — orchestrates workflow (but does NOT validate, save, notify, or log itself)
class OrderService {
  constructor() {
    this.repo = new OrderRepository();
    this.notifier = new NotificationService();
    this.logger = new Logger();
  }

  create(order) {
    OrderValidator.validate(order);

    this.repo.save(order);
    this.notifier.sendOrderCreated(order.userEmail);
    this.logger.info("Order created successfully");
  }
}

// ===============================
// RUN EXAMPLE
// ===============================

const order = {
  userEmail: "customer@example.com",
  items: [
    { id: 1, name: "Laptop", price: 3000 },
    { id: 2, name: "Mouse", price: 100 },
  ],
};

const service = new OrderService();
service.create(order);
