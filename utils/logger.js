class Logger {
  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }

  static step(stepNumber, description) {
    console.log(`\n[STEP ${stepNumber}] ${description}`);
  }
}

module.exports = Logger;
