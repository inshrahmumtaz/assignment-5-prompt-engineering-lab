# Mission 1 – Bad Prompt vs Professional Prompt

## Bad Prompt

```text
Make a JavaScript password checker.
```

## AI Output

The AI generated a JavaScript password strength checker (`passwordStrength.js`) that checks:

- Password length
- Uppercase and lowercase letters
- Numbers and symbols
- Spaces and repeated characters
- Common passwords
- Overall password score and strength
- Improvement feedback

The generated code was tested successfully using weak, fair, and strong password examples.
## Better Prompt

```text
Create a reusable JavaScript password strength checker.

Requirements:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character

Return whether the password is Weak, Medium, or Strong.

Do not manipulate the DOM.
```

## AI Output

The AI generated a reusable password strength checker that:

- Validates all five password requirements.
- Returns a password strength (Weak, Medium, or Strong).
- Does not manipulate the DOM.
- Rejects non-string inputs.
- Includes example test cases demonstrating the function.
## Professional Prompt

```text
Role: Act as a senior JavaScript mentor.

Task: Create a reusable password strength checker.

Context:
This function will be used in a beginner-friendly form validation project.

Constraints:
- Plain JavaScript only
- No external libraries
- Do not manipulate the DOM
- Return a structured object
- Keep the code reusable and beginner-friendly

Output Format:
1. JavaScript code
2. Explanation
3. Manual test cases

Requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Return passed rules, failed rules, score, and strength

Edge Cases:
- Empty string
- Non-string input
- Very long passwords

Verification:
Explain how the function should be tested manually.
```

## AI Output Summary

The AI generated a reusable function named `checkPasswordStrength`.

It returned:

- `passedRules`
- `failedRules`
- `score`
- `strength`

It also handled:

- Empty strings
- Non-string inputs
- Very long passwords
- Manual test cases
- Verification checks

## What the Professional Prompt Improved

Compared with the bad and better prompts, the professional prompt produced:

- A clearly structured return object
- Better input validation
- Reusable rule definitions
- More detailed strength levels
- Edge-case handling
- Explanation and manual tests
- No DOM manipulation

## AI Mistake

The AI used this regular expression for special characters:

```js
/[^A-Za-z0-9]/
```

This means that spaces also count as special characters.

For example:

```js
checkPasswordStrength("Password1 ")
```

could pass the special-character rule even though the only non-alphanumeric character is a space.

## Manual Correction

I changed the special-character rule so whitespace does not count:

```js
/[^A-Za-z0-9\s]/
```

This still accepts punctuation and symbols but rejects spaces as special characters.

## Final Comparison

The bad prompt produced a broad solution because it gave almost no requirements.

The better prompt improved the result by defining validation rules and preventing DOM manipulation.

The professional prompt produced the strongest output because it included:

- Role
- Task
- Context
- Constraints
- Output format
- Edge cases
- Verification instructions

The professional prompt required less guessing from the AI and produced code that was easier to test and reuse.

## Improvements Over the Bad Prompt

- The function became reusable.
- Clear validation requirements were followed.
- DOM manipulation was avoided.
- Input validation was improved.
- The generated output was cleaner and easier to reuse.

## Problems

- The prompt was very short and did not specify the expected output format.
- It did not request reusable code.
- It did not mention edge cases such as empty or non-string inputs.
- It did not specify whether the function should manipulate the DOM.
- It did not ask for explanations or manual test cases.