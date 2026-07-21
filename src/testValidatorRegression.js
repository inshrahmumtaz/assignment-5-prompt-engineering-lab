const assert = require("node:assert/strict");
const { validateForm } = require("./validator");

const ERROR_FIELDS = [
  "name",
  "email",
  "phone",
  "password",
  "confirmPassword"
];

const validData = {
  name: "José García",
  email: "jose@example.com",
  phone: "+34 612 345 678",
  password: "Secure123!",
  confirmPassword: "Secure123!"
};

function resultFor(changes = {}) {
  return validateForm({ ...validData, ...changes });
}

function assertResultShape(result) {
  assert.equal(typeof result.isValid, "boolean");
  assert.deepEqual(Object.keys(result).sort(), ["errors", "isValid"]);
  assert.deepEqual(Object.keys(result.errors).sort(), [...ERROR_FIELDS].sort());

  for (const field of ERROR_FIELDS) {
    assert.ok(Array.isArray(result.errors[field]), `${field} must be an array`);
  }
}

// --------------------
// Valid data
// --------------------

const validResult = validateForm(validData);

assertResultShape(validResult);
assert.equal(validResult.isValid, true);

for (const field of ERROR_FIELDS) {
  assert.deepEqual(validResult.errors[field], []);
}

// --------------------
// Invalid top-level input
// --------------------

for (const input of [undefined, null, [], "form", 123, true]) {
  const result = validateForm(input);

  assertResultShape(result);
  assert.equal(result.isValid, false);

  assert.deepEqual(result.errors.name, ["Name is required."]);
  assert.deepEqual(result.errors.email, ["Email is required."]);
  assert.deepEqual(result.errors.phone, ["Phone number is required."]);
  assert.deepEqual(result.errors.password, ["Password is required."]);
  assert.deepEqual(result.errors.confirmPassword, [
    "Confirm password is required."
  ]);
}

// --------------------
// Trimmed text fields
// --------------------

assert.equal(
  resultFor({
    name: "  José García  ",
    email: "  jose@example.com  ",
    phone: "  +34 612 345 678  "
  }).isValid,
  true
);

// --------------------
// Unicode names
// --------------------

assert.deepEqual(resultFor({ name: "李 小龍" }).errors.name, []);
assert.deepEqual(resultFor({ name: "Jose\u0301 Garcia" }).errors.name, []);
assert.deepEqual(resultFor({ name: "Anne-Marie O'Neil" }).errors.name, []);

// --------------------
// Name validation
// --------------------

assert.deepEqual(resultFor({ name: "A" }).errors.name, [
  "Name must contain at least 2 characters."
]);

assert.deepEqual(resultFor({ name: "John123" }).errors.name, [
  "Name may contain only letters, spaces, apostrophes, and hyphens."
]);

// --------------------
// Email validation
// --------------------

for (const email of [
  "plainaddress",
  "@example.com",
  "missing@example",
  "a@@b.com"
]) {
  assert.deepEqual(resultFor({ email }).errors.email, [
    "Enter a valid email address."
  ]);
}

assert.deepEqual(
  resultFor({ email: "user+tag@example.co.uk" }).errors.email,
  []
);

// --------------------
// Phone validation
// --------------------

assert.deepEqual(resultFor({ phone: "123456789" }).errors.phone, [
  "Phone number must contain between 10 and 15 digits."
]);

assert.deepEqual(resultFor({ phone: "1234567890" }).errors.phone, []);

assert.deepEqual(resultFor({ phone: "123456789012345" }).errors.phone, []);

assert.deepEqual(resultFor({ phone: "1234567890123456" }).errors.phone, [
  "Phone number must contain between 10 and 15 digits."
]);

assert.deepEqual(resultFor({ phone: "92+3001234567" }).errors.phone, [
  "Phone number may contain only digits, spaces, hyphens, parentheses, and an optional leading plus sign."
]);

// --------------------
// Password validation
// --------------------

assert.deepEqual(
  resultFor({
    password: "Aa1!",
    confirmPassword: "Aa1!"
  }).errors.password,
  ["Password must be at least 8 characters."]
);

assert.deepEqual(
  resultFor({
    password: "abcdef1!",
    confirmPassword: "abcdef1!"
  }).errors.password,
  ["Password must contain at least one uppercase letter."]
);

assert.deepEqual(
  resultFor({
    password: "ABCDEF1!",
    confirmPassword: "ABCDEF1!"
  }).errors.password,
  ["Password must contain at least one lowercase letter."]
);

assert.deepEqual(
  resultFor({
    password: "Abcdefg!",
    confirmPassword: "Abcdefg!"
  }).errors.password,
  ["Password must contain at least one number."]
);

assert.deepEqual(
  resultFor({
    password: "Abcdef12",
    confirmPassword: "Abcdef12"
  }).errors.password,
  ["Password must contain at least one special character."]
);

// Space does NOT count as a special character
assert.deepEqual(
  resultFor({
    password: "Abcdef1 ",
    confirmPassword: "Abcdef1 "
  }).errors.password,
  ["Password must contain at least one special character."]
);

// --------------------
// Confirm password
// --------------------

assert.deepEqual(
  resultFor({
    confirmPassword: ""
  }).errors.confirmPassword,
  ["Confirm password is required."]
);

assert.deepEqual(
  resultFor({
    confirmPassword: "Secure123! "
  }).errors.confirmPassword,
  ["Passwords must match."]
);

// --------------------
// Independent objects
// --------------------

const first = validateForm(null);
const second = validateForm(null);

assert.notStrictEqual(first.errors, second.errors);

for (const field of ERROR_FIELDS) {
  assert.notStrictEqual(first.errors[field], second.errors[field]);
}

first.errors.name.push("Changed");

assert.deepEqual(second.errors.name, ["Name is required."]);

// --------------------
// Long input
// --------------------

const longResult = resultFor({
  name: "A".repeat(100000),
  email: `${"a".repeat(100000)}@example.com`,
  phone: "1".repeat(100000),
  password: `${"A".repeat(100000)}a1!`,
  confirmPassword: `${"A".repeat(100000)}a1!`
});

assertResultShape(longResult);

assert.deepEqual(longResult.errors.phone, [
  "Phone number must contain between 10 and 15 digits."
]);

console.log("All validator regression tests passed.");