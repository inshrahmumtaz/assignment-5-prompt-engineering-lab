/**
 * Validates registration form data without accessing the DOM.
 *
 * @param {*} formData
 * @returns {{
 *   isValid: boolean,
 *   errors: {
 *     name: string[],
 *     email: string[],
 *     phone: string[],
 *     password: string[],
 *     confirmPassword: string[]
 *   }
 * }}
 */
function validateForm(formData) {
  const errors = {
    name: [],
    email: [],
    phone: [],
    password: [],
    confirmPassword: []
  };

  const data =
    formData !== null &&
    typeof formData === "object" &&
    !Array.isArray(formData)
      ? formData
      : {};

  validateName(data.name, errors.name);
  validateEmail(data.email, errors.email);
  validatePhone(data.phone, errors.phone);
  validatePassword(data.password, errors.password);
  validateConfirmPassword(
    data.confirmPassword,
    data.password,
    errors.confirmPassword
  );

  const isValid = Object.values(errors).every(
    (fieldErrors) => fieldErrors.length === 0
  );

  return {
    isValid,
    errors
  };
}

function validateName(value, fieldErrors) {
  if (typeof value !== "string") {
    fieldErrors.push("Name is required.");
    return;
  }

  const name = value.trim();

  if (name.length === 0) {
    fieldErrors.push("Name is required.");
    return;
  }

  if (name.length < 2) {
    fieldErrors.push("Name must contain at least 2 characters.");
  }

  if (!/^[\p{L}\p{M}\s'-]+$/u.test(name)) {
    fieldErrors.push(
      "Name may contain only letters, spaces, apostrophes, and hyphens."
    );
  }
}

function validateEmail(value, fieldErrors) {
  if (typeof value !== "string") {
    fieldErrors.push("Email is required.");
    return;
  }

  const email = value.trim();

  if (email.length === 0) {
    fieldErrors.push("Email is required.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    fieldErrors.push("Enter a valid email address.");
  }
}

function validatePhone(value, fieldErrors) {
  if (typeof value !== "string") {
    fieldErrors.push("Phone number is required.");
    return;
  }

  const phone = value.trim();

  if (phone.length === 0) {
    fieldErrors.push("Phone number is required.");
    return;
  }

  const phonePattern = /^\+?[0-9\s()-]+$/;

  if (!phonePattern.test(phone)) {
    fieldErrors.push(
      "Phone number may contain only digits, spaces, hyphens, parentheses, and an optional leading plus sign."
    );
    return;
  }

  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    fieldErrors.push("Phone number must contain between 10 and 15 digits.");
  }
}

function validatePassword(value, fieldErrors) {
  if (typeof value !== "string" || value.length === 0) {
    fieldErrors.push("Password is required.");
    return;
  }

  if (value.length < 8) {
    fieldErrors.push("Password must be at least 8 characters.");
  }

  if (!/[A-Z]/.test(value)) {
    fieldErrors.push("Password must contain at least one uppercase letter.");
  }

  if (!/[a-z]/.test(value)) {
    fieldErrors.push("Password must contain at least one lowercase letter.");
  }

  if (!/[0-9]/.test(value)) {
    fieldErrors.push("Password must contain at least one number.");
  }

  if (!/[^A-Za-z0-9\s]/.test(value)) {
    fieldErrors.push("Password must contain at least one special character.");
  }
}

function validateConfirmPassword(confirmPassword, password, fieldErrors) {
  if (
    typeof confirmPassword !== "string" ||
    confirmPassword.length === 0
  ) {
    fieldErrors.push("Confirm password is required.");
    return;
  }

  if (
    typeof password !== "string" ||
    confirmPassword !== password
  ) {
    fieldErrors.push("Passwords must match.");
  }
}

module.exports = { validateForm };