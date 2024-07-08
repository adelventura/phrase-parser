const readline = require("readline");
const Processor = require("./Processor");

class StdinProcessor extends Processor {
  async process() {
    const lineReader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    return this.processInput(lineReader);
  }
}

module.exports = StdinProcessor;
