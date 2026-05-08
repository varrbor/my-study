class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      cb => cb !== callback
    );
  }

  publish(eventName, data) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(callback => callback(data));
  }
}

// Usage
const bus = new EventBus();

// Subscribers
function logger(data) {
  console.log("Logger received:", data);
}

function analytics(data) {
  console.log("Analytics received:", data);
}

// Subscribe to event
bus.subscribe("user:login", logger);
bus.subscribe("user:login", analytics);

// Publish event
bus.publish("user:login", { user: "Bohdan", time: Date.now() });
