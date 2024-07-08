class ReportGenerator {
  constructor(count, data) {
    this.count = count;
    this.data = data;
    this.reportData = null;

    this.generateReportData();
  }

  sortSequences(sequenceMap) {
    return [...sequenceMap.entries()].sort((a, b) => {
      return b[1] - a[1];
    });
  }

  generateReportData() {
    try {
      const sorted = this.sortSequences(this.data);
      this.reportData = sorted.slice(0, this.count);
    } catch (error) {
      console.log(
        `Error occurred while generating report data: ${
          error.message ?? "Unknown error"
        }`
      );
      this.reportData = [];
    }
  }

  print() {
    if (!this.reportData) {
      this.generateReportData();
    }

    this.reportData.forEach(([sequence, count]) => {
      console.log(`${sequence} - ${count}`);
    });
  }
}

module.exports = ReportGenerator;
