const run = require("../index");

describe("run", () => {
  jest.replaceProperty(process, "argv", ["./mock.txt"]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should run script with mock inputs", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    process.argv = ["node", "index.js", "./tests/mock.txt"];

    await run();

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenLastCalledWith("funeral i meet - 1");
  });
});
