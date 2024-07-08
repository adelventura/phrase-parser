class Processor {
  constructor(sequenceLength) {
    this.sequenceLength = sequenceLength;
    this.sequenceMap = new Map();
    this.previousTokens = [];
  }

  processLine(line) {
    if (!line) {
      return [];
    }

    const tokens = line.match(/[\p{L}'-]+/gu);

    if (!tokens) {
      return [];
    }

    return tokens
      .map((word) => {
        return word.replace(/^['-]+|['-]+$/g, "").toLowerCase();
      })
      .filter((word) => word.trim());
  }

  extractSequences(tokens) {
    if (tokens.length < this.sequenceLength) {
      return;
    }

    for (let i = 0; i <= tokens.length - this.sequenceLength; i++) {
      const sequence = tokens.slice(i, i + this.sequenceLength).join(" ");
      const count = this.sequenceMap.get(sequence) || 0;

      this.sequenceMap.set(sequence, count + 1);
    }

    this.previousTokens = tokens.slice(
      Math.max(tokens.length - this.sequenceLength + 1, 0)
    );
  }

  async processInput(lineReader) {
    return new Promise((resolve, reject) => {
      lineReader.on("line", (line) => {
        const tokenizedLine = this.processLine(line);
        this.extractSequences([...this.previousTokens, ...tokenizedLine]);
      });

      lineReader.on("close", () => {
        resolve(this.sequenceMap);
      });

      lineReader.on("error", (error) => {
        reject(error.message ?? "An error occurred while reading the file");
      });
    });
  }
}

module.exports = Processor;
