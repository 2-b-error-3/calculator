import selectors from "./selectors";

export function clearData() {
  cy.get(selectors.summaInput).clear();
  cy.get(selectors.kuudInput).clear();
}

export function escapeSpecialCharacters(input) {
  if (input == null) {
    return null;
  }
  return input
    .replace(/'/g, "''")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

export function calculateMonthlyPayment(loanAmount, months, interestRateValue) {
  const monthIntrestRate = interestRateValue / (100 * 12);
  const numerator =
    loanAmount * monthIntrestRate * Math.pow(1 + monthIntrestRate, months);
  const denominator = Math.pow(1 + monthIntrestRate, months) - 1;
  const monthlyPaymentCalculated = numerator / denominator;

  return monthlyPaymentCalculated;
}
