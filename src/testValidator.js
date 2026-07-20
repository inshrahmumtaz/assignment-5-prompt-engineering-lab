const { validateForm } = require("./validator");

const testCases = [
  {
    title: "Valid registration",
    data: {
      name: "Anne-Marie O'Neil",
      email: "anne@example.com",
      phone: "+44 (20) 1234-5678",
      password: "Secure123!",
      confirmPassword: "Secure123!"
    }
  },
  {
    title: "Empty form",
    data: {
      name: "   ",
      email: "",
      phone: "   ",
      password: "",
      confirmPassword: ""
    }
  },
  {
    title: "Missing input",
    data: undefined
  },
  {
    title: "Null input",
    data: null
  },
  {
    title: "Invalid formats",
    data: {
      name: "J@",
      email: "not-an-email",
      phone: "+1 555 CALL-NOW",
      password: "weak",
      confirmPassword: "different"
    }
  },
  {
    title: "International phone number",
    data: {
      name: "Sara Khan",
      email: "sara@example.org",
      phone: "+92 300 123-4567",
      password: "Example9!",
      confirmPassword: "Example9!"
    }
  },
  {
    title: "Password mismatch",
    data: {
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      password: "Correct8!",
      confirmPassword: "Correct9!"
    }
  },
  {
    title: "Unicode name",
    data: {
      name: "José García",
      email: "jose@example.com",
      phone: "+34 612 345 678",
      password: "Example9!",
      confirmPassword: "Example9!"
    }
  },
  {
    title: "Plus sign in wrong position",
    data: {
      name: "Sara Khan",
      email: "sara@example.org",
      phone: "92+3001234567",
      password: "Example9!",
      confirmPassword: "Example9!"
    }
  }
];

for (const testCase of testCases) {
  console.log(`\nTEST: ${testCase.title}`);
  console.log(JSON.stringify(validateForm(testCase.data), null, 2));
}