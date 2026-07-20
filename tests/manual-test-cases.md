# Manual Test Cases

## Mission 1: Password Strength Checker

| Test | Input | Expected Result | Actual Result | Status |
|------|-------|-----------------|---------------|--------|
| Empty password | "" | Very weak | Very weak | Pass |
| Null input | null | Invalid input | Invalid input | Pass |
| Number input | 12345678 | Invalid input | Invalid input | Pass |
| Lowercase only | password | Weak | Weak | Pass |
| No number or symbol | Password | Medium | Medium | Pass |
| No special character | Password1 | Strong | Strong | Pass |
| Meets all rules | Password1! | Very strong | Very strong | Pass |
| Space instead of symbol | Password1 | Strong | Strong | Pass |

---

## Mission 2: Form Validator

| Test | Expected Result | Actual Result | Status |
|------|-----------------|---------------|--------|
| Valid registration | isValid true | Passed | Pass |
| Empty form | Required errors | Passed | Pass |
| Missing input | Required errors | Passed | Pass |
| Null input | Required errors | Passed | Pass |
| Invalid formats | Validation errors | Passed | Pass |
| International phone | Valid | Passed | Pass |
| Password mismatch | Match error | Passed | Pass |
| Unicode name | Valid | Passed | Pass |
| Wrong plus sign | Phone error | Passed | Pass |
## Mission 3: Debugging

| Test | Expected Result | Actual Result | Status |
|------|-----------------|---------------|--------|
| [10,20,30] | 20 | 20 | Pass |
| [5] | 5 | 5 | Pass |
| [-10,0,10] | 0 | 0 | Pass |
| [1.5,2.5] | 2 | 2 | Pass |
| [] | null | null | Pass |
| Invalid input | null | null | Pass |