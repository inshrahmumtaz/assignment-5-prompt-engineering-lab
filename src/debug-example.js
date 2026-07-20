function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return null;
  }

  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum / numbers.length;
}

module.exports = { calculateAverage };