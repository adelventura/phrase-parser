const FileProcessor = require("./processors/FileProcessor");
const ReportGenerator = require("./generators/ReportGenerator");
const StdinProcessor = require("./processors/StdinProcessor");

const SEQUENCE_LENGTH = 3;
const REPORT_LENGTH = 100;

const flattenSequenceMaps = (sequenceMaps) => {
  const flattened = new Map();

  sequenceMaps.forEach((sequenceMap) => {
    sequenceMap.forEach((value, key) => {
      flattened.set(key, (flattened.get(key) || 0) + value);
    });
  });

  return flattened;
};

const processInputs = async (filenames) => {
  if (filenames && filenames.length > 0) {
    const sequences = filenames.map((filename) => {
      return new FileProcessor(SEQUENCE_LENGTH, filename.trim()).process();
    });

    return flattenSequenceMaps(await Promise.all(sequences));
  } else {
    return new StdinProcessor(SEQUENCE_LENGTH).process();
  }
};

const run = async () => {
  try {
    const filenames = process.env.FILENAME
      ? process.env.FILENAME.split(",")
      : process.argv.splice(2);
    const sequenceMap = await processInputs(filenames);
    const reportGenerator = new ReportGenerator(REPORT_LENGTH, sequenceMap);

    reportGenerator.print();
  } catch (error) {
    console.log("Error occurred in run: ", error);
  }
};

run();

module.exports = run;
