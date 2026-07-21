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
  const errors = createEmptyErrors();
  const data = isPlainFormData(formData) ? formData : {};

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

function createEmptyErrors() {
  return {
    name: [],
    email: [],
    phone: [],
    password: [],
    confirmPassword: []
  };
}

function isPlainFormData(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getRequiredText(value, requiredMessage, fieldErrors) {
  if (typeof value !== "string") {
    fieldErrors.push(requiredMessage);
    return null;
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    fieldErrors.push(requiredMessage);
    return null;
  }

  return trimmedValue;
}

function validateName(value, fieldErrors) {
  const name = getRequiredText(value, "Name is required.", fieldErrors);

  if (name === null) {
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
  const email = getRequiredText(value, "Email is required.", fieldErrors);

  if (email === null) {
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    fieldErrors.push("Enter a valid email address.");
  }
}

function validatePhone(value, fieldErrors) {
  const phone = getRequiredText(
    value,
    "Phone number is required.",
    fieldErrors
  );

  if (phone === null) {
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

  const passwordRules = [
    {
      passes: value.length >= 8,
      message: "Password must be at least 8 characters."
    },
    {
      passes: /[A-Z]/.test(value),
      message: "Password must contain at least one uppercase letter."
    },
    {
      passes: /[a-z]/.test(value),
      message: "Password must contain at least one lowercase letter."
    },
    {
      passes: /[0-9]/.test(value),
      message: "Password must contain at least one number."
    },
    {
      passes: /[^A-Za-z0-9\s]/.test(value),
      message: "Password must contain at least one special character."
    }
  ];

  for (const rule of passwordRules) {
    if (!rule.passes) {
      fieldErrors.push(rule.message);
    }
  }
}

function validateConfirmPassword(confirmPassword, password, fieldErrors) {
  if (typeof confirmPassword !== "string" || confirmPassword.length === 0) {
    fieldErrors.push("Confirm password is required.");
    return;
  }

  if (typeof password !== "string" || confirmPassword !== password) {
    fieldErrors.push("Passwords must match.");
  }
}

module.exports = { validateForm };
