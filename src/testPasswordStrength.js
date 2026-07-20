const {
  checkPasswordStrength
} = require("./passwordStrength");

const testCases = [
  "",
  null,
  12345678,
  "password",
  "Password",
  "Password1",
  "Password1!",
  "Password1 "
];

for (const testInput of testCases) {
  console.log("Input:", JSON.stringify(testInput));
  console.log(checkPasswordStrength(testInput));
  console.log("--------------------");
}