class DataParser {
  parseFile() {
    this.loadFile();
    this.parseData();
    this.validate();
    this.save();
  }

  loadFile() {
    console.log("Loading file...");
  }

  // Steps to be overridden
  parseData() {
    throw new Error("parseData() must be implemented");
  }

  validate() {
    console.log("Validating data...");
  }

  save() {
    console.log("Saving parsed data...");
  }
}
class CSVParser extends DataParser {
  parseData() {
    console.log("Parsing CSV data...");
  }
}
class JSONParser extends DataParser {
  parseData() {
    console.log("Parsing JSON data...");
  }
}
const csv = new CSVParser();
csv.parseFile();

const json = new JSONParser();
json.parseFile();
