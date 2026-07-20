# Mission 2 – Constraint-Based Code Generation

## Professional Prompt

Used a professional prompt with:
- Role
- Task
- Context
- Constraints
- Validation Rules
- Output Format
- Edge Cases
- Verification

## AI Output Summary

Codex generated a reusable JavaScript form validator that validates:

- Name
- Email
- Phone
- Password
- Confirm Password

The function returns:

- isValid
- errors object

without manipulating the DOM.

## What AI Generated Correctly

- Reusable validation logic
- Structured error object
- Password validation
- Phone validation
- Email validation
- Manual test cases

## AI Mistake

The generated regular expression for validating names accepted only English letters:

```js
/^[A-Za-z\s'-]+$/
```

This rejected valid Unicode names such as:

- José
- Zoë
- محمد

## Manual Correction

Updated the regex to:

```js
/^[\p{L}\p{M}\s'-]+$/u
```

This allows letters from multiple languages while still restricting numbers and symbols.

## Verification

The validator was tested using Node.js with:

- Valid registration
- Empty form
- Missing input
- Null input
- Invalid formats
- International phone numbers
- Password mismatch
- Unicode names
- Invalid phone format

All test cases produced the expected results.