const { calculateAverage } = require("./debug-example");

const testCases = [
  [10, 20, 30],
  [5],
  [-10, 0, 10],
  [1.5, 2.5],
  [],
  "10,20,30",
  [10, "20", 30],
  [10, NaN, 30],
  [10, Infinity, 30]
];

for (const test of testCases) {
  console.log("Input:", test);
  console.log("Output:", calculateAverage(test));
  console.log("----------------------------");
}