import { EMIPlanTemplate, ComputedEMIPlan } from '../data/types';

/**
 * Standard reducing-balance EMI formula:
 *   EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where r = monthly interest rate (annual rate / 12 / 100), n = tenure in months.
 *
 * No-cost EMI plans waive interest entirely: the customer pays exactly
 * principal / tenure per month, plus any flat processing fee.
 *
 * Kept as a pure function (no UI, no fetching) so it's independently
 * testable and reusable anywhere EMI math is needed.
 */
export function computeEmiPlan(template: EMIPlanTemplate, principal: number): ComputedEMIPlan {
  const { tenureMonths, interestRatePercent, processingFee, isNoCostEmi } = template;

  if (isNoCostEmi || interestRatePercent === 0) {
    const monthlyAmount = principal / tenureMonths;
    return {
      ...template,
      principal,
      monthlyAmount,
      totalInterest: 0,
      totalPayable: principal + processingFee,
    };
  }

  const monthlyRate = interestRatePercent / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyAmount = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayable = monthlyAmount * tenureMonths + processingFee;
  const totalInterest = totalPayable - principal - processingFee;

  return {
    ...template,
    principal,
    monthlyAmount,
    totalInterest,
    totalPayable,
  };
}

export function computeEmiPlans(templates: EMIPlanTemplate[], principal: number): ComputedEMIPlan[] {
  return templates
    .map((template) => computeEmiPlan(template, principal))
    .sort((a, b) => a.tenureMonths - b.tenureMonths);
}
