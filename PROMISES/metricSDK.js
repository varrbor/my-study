// Metrics SDK: A library that queues events, batches them, and flushes after a delay or max size.
class MetricsSDK {
  constructor({
    flushInterval = 5000,
    maxBatchSize = 5,
  } = {}) {

    this.queue = [];

    this.flushInterval = flushInterval;
    this.maxBatchSize = maxBatchSize;

    this.timer = null;

    this.startAutoFlush();
  }

  // Add event
  track(event) {
    this.queue.push({
      ...event,
      timestamp: Date.now(),
    });

    console.log("Queued:", event);

    // Flush immediately if limit reached
    if (this.queue.length >= this.maxBatchSize) {
      this.flush();
    }
  }

  // Send events
  async flush() {

    if (this.queue.length === 0) {
      return;
    }

    // Take current batch
    const batch = [...this.queue];

    // Clear queue
    this.queue = [];

    console.log("Flushing batch:", batch);

    try {
      await this.send(batch);

    } catch (err) {

      console.error("Flush failed:", err);

      // Requeue failed batch
      this.queue.unshift(...batch);
    }
  }

  // Simulate API request
  async send(batch) {

    return new Promise((resolve) => {

      setTimeout(() => {

        console.log("Sent to server:", batch);

        resolve();

      }, 1000);

    });
  }

  // Start periodic flush
  startAutoFlush() {

    this.timer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  // Stop timer
  stop() {
    clearInterval(this.timer);
  }
}

// usage
const metrics = new MetricsSDK({
  flushInterval: 3000,
  maxBatchSize: 3,
});

metrics.track({
  type: "click",
  button: "login",
});

metrics.track({
  type: "page_view",
  page: "/home",
});

metrics.track({
  type: "scroll",
  percent: 80,
});