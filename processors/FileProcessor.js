const fs = require("fs");
const readline = require("readline");
const Processor = require("./Processor");

class FileProcessor extends Processor {
  constructor(sequenceLength, filename) {
    super(sequenceLength);
    this.filename = filename;
  }

  async process() {
    const fileReader = fs.createReadStream(this.filename, {
      encoding: "utf8",
    });

    const lineReader = readline.createInterface({
      input: fileReader,
      crlfDelay: Infinity,
    });

    return this.processInput(lineReader);
  }
}

module.exports = FileProcessor;
