# Mission 3 – Debugging and Error Analysis

## Prompt

Used Codex with a debugging-focused prompt asking it to:

- Identify the bug
- Explain why it occurs
- Provide corrected code
- Suggest manual tests

## AI Output Summary

Codex identified an off-by-one error in the loop condition.

The original code used:

```js
for (let i = 0; i <= numbers.length; i++)
```

which accessed an invalid array index.

## Root Cause

The loop processed `numbers[numbers.length]`, which is `undefined`.

Adding `undefined` to the running total produced `NaN`, causing the average calculation to fail.

## AI Suggestion

Replace:

```js
i <= numbers.length
```

with:

```js
i < numbers.length
```

Codex also suggested handling empty arrays by returning `null`.

## Manual Review

The suggested fix was correct and produced the expected output.

## Verification

The corrected code was tested with:

- Positive integers
- Single-element arrays
- Negative numbers
- Decimal values
- Empty arrays
- Invalid input