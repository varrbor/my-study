class EventLog {
  constructor() {
    this.events = []; // durable log
    this.subscribers = [];
  }

  // producer writes event to the log
  append(event) {
    this.events.push(event);
    this.subscribers.forEach(sub => sub(event));
  }

  // consumer subscribes to new events
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  // consumer can replay history
  replay(callback) {
    this.events.forEach(event => callback(event));
  }
}

// Usage
const log = new EventLog();

// Consumer A: wants full history
log.replay(event => {
  console.log("A replayed:", event);
});

// Consumer B: wants only new events
log.subscribe(event => {
  console.log("B received:", event);
});

// Producer writes events
log.append({ type: "USER_CREATED", user: "Bohdan" });
log.append({ type: "ORDER_PLACED", orderId: 42 });