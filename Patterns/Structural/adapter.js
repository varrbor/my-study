class ThirdPartyLogger {
  write(message) {
    console.log("Third-party:", message);
  }
}

class Logger {
  log(message) {}
}

class LoggerAdapter extends Logger {
  constructor(thirdPartyLogger) {
    super();
    this.thirdPartyLogger = thirdPartyLogger;
  }

  log(message) {
    // Translate log() → write()
    this.thirdPartyLogger.write(message);
  }
}

const thirdParty = new ThirdPartyLogger();
const logger = new LoggerAdapter(thirdParty);

logger.log("Hello, Bohdan!");