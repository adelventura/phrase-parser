const Processor = require("../../processors/Processor");

describe("processLine", () => {
  const processor = new Processor(3, "mock.txt");
  it("processes an individual line correctly", () => {
    const line = "This is 'just' a test!";
    const expectedTokens = ["this", "is", "just", "a", "test"];

    const tokens = processor.processLine(line);

    expect(tokens).toEqual(expectedTokens);
  });

  it("respects hyphenated words as single tokens", () => {
    const line = "This test is well-planned!";
    const expectedTokens = ["this", "test", "is", "well-planned"];

    const tokens = processor.processLine(line);

    expect(tokens).toEqual(expectedTokens);
  });

  it("respects contractions as single tokens", () => {
    const line = "Don't worry - it's a test!";
    const expectedTokens = ["don't", "worry", "it's", "a", "test"];

    const tokens = processor.processLine(line);

    expect(tokens).toEqual(expectedTokens);
  });

  it("handles unicode characters", () => {
    const line =
      "Die Kirschen in Nachbars Garten schmecken immer ein bisschen süßer.";
    const expectedTokens = [
      "die",
      "kirschen",
      "in",
      "nachbars",
      "garten",
      "schmecken",
      "immer",
      "ein",
      "bisschen",
      "süßer",
    ];
    const tokens = processor.processLine(line);

    expect(tokens).toEqual(expectedTokens);
  });

  // empty lines
});

describe("extractSequences", () => {
  const tokens = [
    "don't",
    "worry",
    "this",
    "test",
    "is",
    "very",
    "well-planned",
  ];

  it("adds sequences to the sequenceMap", () => {
    const processor = new Processor(3, "mock.txt");
    expect(processor.sequenceMap.size).toEqual(0);

    processor.extractSequences(tokens);

    expect(processor.sequenceMap.size).toEqual(5);
  });

  it("sets previousTokens correctly", () => {
    const processor = new Processor(3, "mock.txt");
    expect(processor.previousTokens).toEqual([]);

    processor.extractSequences(tokens);
    expect(processor.previousTokens).toEqual(["very", "well-planned"]);
  });

  it("increments the count if a sequence already exists in the sequenceMap", () => {
    const processor = new Processor(3, "mock.txt");
    expect(processor.sequenceMap.size).toEqual(0);

    processor.extractSequences([...tokens, "don't", "worry", "this", "is"]);

    expect(processor.sequenceMap.size).toEqual(8);
    expect(processor.sequenceMap.get("don't worry this")).toEqual(2);
  });

  it("returns early if the number of tokens is less than the sequenceLength", () => {
    const processor = new Processor(3, "mock.txt");
    expect(processor.sequenceMap.size).toEqual(0);

    processor.extractSequences(["hello", "test"]);

    expect(processor.sequenceMap.size).toEqual(0);
  });
});
