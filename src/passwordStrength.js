/**
 * Checks a password against a reusable set of strength rules.
 *
 * @param {*} password - The value to validate.
 * @returns {{
 *   passedRules: string[],
 *   failedRules: string[],
 *   score: number,
 *   strength: string
 * }}
 */
function checkPasswordStrength(password) {
  const rules = [
    {
      name: "Minimum 8 characters",
      test: (value) => value.length >= 8
    },
    {
      name: "At least one uppercase letter",
      test: (value) => /[A-Z]/.test(value)
    },
    {
      name: "At least one lowercase letter",
      test: (value) => /[a-z]/.test(value)
    },
    {
      name: "At least one number",
      test: (value) => /[0-9]/.test(value)
    },
    {
      name: "At least one special character",
      test: (value) => /[^A-Za-z0-9\s]/.test(value)
    }
  ];

  if (typeof password !== "string") {
    return {
      passedRules: [],
      failedRules: rules.map((rule) => rule.name),
      score: 0,
      strength: "Invalid input"
    };
  }

  const passedRules = [];
  const failedRules = [];

  for (const rule of rules) {
    if (rule.test(password)) {
      passedRules.push(rule.name);
    } else {
      failedRules.push(rule.name);
    }
  }

  const score = passedRules.length;

  let strength;

  if (score <= 1) {
    strength = "Very weak";
  } else if (score === 2) {
    strength = "Weak";
  } else if (score === 3) {
    strength = "Medium";
  } else if (score === 4) {
    strength = "Strong";
  } else {
    strength = "Very strong";
  }

  return {
    passedRules,
    failedRules,
    score,
    strength
  };
}

module.exports = { checkPasswordStrength };