const assert = require("node:assert/strict");
const { validateForm } = require("./validator");

const validData = {
  name: "José García",
  email: "jose@example.com",
  phone: "+34 612 345 678",
  password: "Secure123!",
  confirmPassword: "Secure123!"
};

// Fully valid data
assert.equal(validateForm(validData).isValid, true);

// Text fields are trimmed
assert.equal(
  validateForm({
    ...validData,
    name: "  José García  ",
    email: "  jose@example.com  ",
    phone: "  +34 612 345 678  "
  }).isValid,
  true
);

// Unicode combining marks are accepted
assert.equal(
  validateForm({
    ...validData,
    name: "Jose\u0301 Garcia"
  }).isValid,
  true
);

// Whitespace does not count as a special character
const whitespacePasswordResult = validateForm({
  ...validData,
  password: "Abcdef1 ",
  confirmPassword: "Abcdef1 "
});

assert.deepEqual(whitespacePasswordResult.errors.password, [
  "Password must contain at least one special character."
]);

// Passwords are not trimmed before comparison
assert.deepEqual(
  validateForm({
    ...validData,
    password: "Secure123!",
    confirmPassword: "Secure123! "
  }).errors.confirmPassword,
  ["Passwords must match."]
);

// Phone number below minimum length
assert.deepEqual(
  validateForm({
    ...validData,
    phone: "123456789"
  }).errors.phone,
  ["Phone number must contain between 10 and 15 digits."]
);

// Phone number at maximum valid length
assert.deepEqual(
  validateForm({
    ...validData,
    phone: "123456789012345"
  }).errors.phone,
  []
);

// Phone number above maximum length
assert.deepEqual(
  validateForm({
    ...validData,
    phone: "1234567890123456"
  }).errors.phone,
  ["Phone number must contain between 10 and 15 digits."]
);

// Missing and invalid input
assert.equal(validateForm().isValid, false);
assert.equal(validateForm(null).isValid, false);
assert.equal(validateForm([]).isValid, false);

// Each call returns a new errors object
const firstResult = validateForm(null);
const secondResult = validateForm(null);

assert.notEqual(firstResult.errors, secondResult.errors);
assert.notEqual(firstResult.errors.name, secondResult.errors.name);

console.log("All regression tests passed.");