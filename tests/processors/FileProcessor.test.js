const FileProcessor = require("../../processors/FileProcessor");

describe("process", () => {
  it("resolves if file is valid", async () => {
    const fileProcessor = new FileProcessor(3, "./tests/mock.txt");
    await expect(fileProcessor.process()).resolves.toBeTruthy();
  });

  it("rejects if the file is invalid", async () => {
    const fileProcessor = new FileProcessor(3, "mock-2.txt");
    await expect(fileProcessor.process()).rejects.toEqual(
      "ENOENT: no such file or directory, open 'mock-2.txt'"
    );
  });

  it("processes a text file", async () => {
    const fileProcessor = new FileProcessor(3, "./tests/mock.txt");
    await fileProcessor.process();

    expect(fileProcessor.sequenceMap.size).toEqual(91);
  });

  it("correctly identifies repeated sequences within the text file", async () => {
    const fileProcessor = new FileProcessor(3, "./tests/mock.txt");
    await fileProcessor.process();

    expect(fileProcessor.sequenceMap.get("it is a")).toEqual(2);
    expect(fileProcessor.sequenceMap.get("whenever i find")).toEqual(2);
    expect(fileProcessor.sequenceMap.get("whenever i find")).toEqual(2);
  });

  it("correctly identifies sequences across two lines", async () => {
    const fileProcessor = new FileProcessor(3, "./tests/mock.txt");
    await fileProcessor.process();
    expect(fileProcessor.sequenceMap.size).toEqual(91);

    expect(fileProcessor.sequenceMap.get("every funeral i")).toEqual(1);
    expect(fileProcessor.sequenceMap.get("funeral i meet")).toEqual(1);
    expect(fileProcessor.sequenceMap.has("i meet")).toBeFalsy();
  });
});
