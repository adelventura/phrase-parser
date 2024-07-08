const ReportGenerator = require("../../generators/ReportGenerator");

const mockData = new Map([
  ["this is just", 3],
  ["just another test", 2],
  ["another test that", 5],
  ["this is going", 1],
  ["going very well", 1],
]);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("generates report data correctly", () => {
  const reportGenerator = new ReportGenerator(3, mockData);
  reportGenerator.generateReportData();

  expect(reportGenerator.reportData).toEqual([
    ["another test that", 5],
    ["this is just", 3],
    ["just another test", 2],
  ]);
});

it("handles errors due to missing data", () => {
  const consoleSpy = jest.spyOn(console, "log");

  const reportGenerator = new ReportGenerator(3);

  expect(consoleSpy).toHaveBeenCalledWith(
    "Error occurred while generating report data: Cannot read properties of undefined (reading 'entries')"
  );
  expect(reportGenerator.reportData).toEqual([]);
});

it("should print the report", () => {
  const consoleSpy = jest.spyOn(console, "log");

  const reportGenerator = new ReportGenerator(3, mockData);
  reportGenerator.print();

  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith("another test that - 5");
  expect(consoleSpy).toHaveBeenCalledWith("this is just - 3");
  expect(consoleSpy).toHaveBeenLastCalledWith("just another test - 2");
});
