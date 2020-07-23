const writeEngine = require("./writeEngine");
const rater = require("./rater");

// CSV generation
writeEngine(rater.header, rater.stringGen, 10000, "../rater.csv");
