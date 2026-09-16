// Shared calculation and formatting helpers used across every calculator.

/** Format a number as Indian Rupees using the Indian digit grouping (e.g. ₹1,25,000). */
export function formatINR(value: number, maximumFractionDigits = 0): string {
  if (!isFinite(value)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

/** Format a plain number using Indian digit grouping, no currency symbol. */
export function formatIndianNumber(value: number, maximumFractionDigits = 0): string {
  if (!isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits,
  }).format(value);
}

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
}

/** Standard reducing-balance EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1) */
export function calculateEMI(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0, principal };
  }
  const monthlyRate = annualRatePercent / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalInterest, totalPayment, principal };
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export function buildAmortizationSchedule(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): AmortizationRow[] {
  if (principal <= 0 || tenureMonths <= 0) return [];
  const monthlyRate = annualRatePercent / 12 / 100;
  const { emi } = calculateEMI(principal, annualRatePercent, tenureMonths);

  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPaid = balance * monthlyRate;
    let principalPaid = emi - interestPaid;
    if (month === tenureMonths) {
      // Absorb rounding drift in the final installment.
      principalPaid = balance;
    }
    balance = Math.max(balance - principalPaid, 0);
    rows.push({
      month,
      emi: month === tenureMonths ? principalPaid + interestPaid : emi,
      principalPaid,
      interestPaid,
      balance,
    });
  }

  return rows;
}

export interface GstResult {
  baseAmount: number;
  gstAmount: number;
  finalAmount: number;
}

export function addGST(amount: number, gstPercent: number): GstResult {
  const gstAmount = (amount * gstPercent) / 100;
  return {
    baseAmount: amount,
    gstAmount,
    finalAmount: amount + gstAmount,
  };
}

export function removeGST(inclusiveAmount: number, gstPercent: number): GstResult {
  const baseAmount = inclusiveAmount / (1 + gstPercent / 100);
  const gstAmount = inclusiveAmount - baseAmount;
  return {
    baseAmount,
    gstAmount,
    finalAmount: inclusiveAmount,
  };
}

export interface SalaryInputs {
  annualCTC: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  otherAllowances: number;
  employeePF: number;
  professionalTax: number;
  otherDeductions: number;
}

export interface SalaryResult {
  monthlyGross: number;
  monthlyDeductions: number;
  monthlyTakeHome: number;
  annualGross: number;
  annualDeductions: number;
  annualTakeHome: number;
}

export function calculateSalary(inputs: SalaryInputs): SalaryResult {
  const annualGross =
    inputs.basicSalary + inputs.hra + inputs.specialAllowance + inputs.otherAllowances;
  const annualDeductions =
    inputs.employeePF * 12 + inputs.professionalTax * 12 + inputs.otherDeductions * 12;

  const annualTakeHome = Math.max(annualGross - annualDeductions, 0);

  return {
    monthlyGross: annualGross / 12,
    monthlyDeductions: annualDeductions / 12,
    monthlyTakeHome: annualTakeHome / 12,
    annualGross,
    annualDeductions,
    annualTakeHome,
  };
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
}

/** Standard SIP future value formula: FV = P × [((1+i)^n − 1) / i] × (1+i), monthly compounding. */
export function calculateSIP(
  monthlyInvestment: number,
  annualReturnPercent: number,
  years: number
): SipResult {
  const months = years * 12;
  const i = annualReturnPercent / 12 / 100;

  let futureValue: number;
  if (i === 0) {
    futureValue = monthlyInvestment * months;
  } else {
    futureValue =
      monthlyInvestment * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
  }

  const totalInvested = monthlyInvestment * months;
  const estimatedReturns = futureValue - totalInvested;

  return { totalInvested, estimatedReturns, futureValue };
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalDays: number;
  nextBirthday: Date;
  daysUntilNextBirthday: number;
}

export function calculateAge(dob: Date, today: Date = new Date()): AgeResult | null {
  if (isNaN(dob.getTime()) || dob > today) return null;

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
  const totalMonths = years * 12 + months;

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < todayMidnight) {
    nextBirthday = new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate());
  }

  const daysUntilNextBirthday = Math.round(
    (nextBirthday.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalMonths, totalDays, nextBirthday, daysUntilNextBirthday };
}

export function percentOf(x: number, y: number): number {
  return (x / 100) * y;
}

export function whatPercentage(x: number, y: number): number {
  if (y === 0) return 0;
  return (x / y) * 100;
}

export function percentageIncrease(from: number, to: number): number {
  if (from === 0) return 0;
  return ((to - from) / from) * 100;
}

export function percentageDecrease(from: number, to: number): number {
  if (from === 0) return 0;
  return ((from - to) / from) * 100;
}

export function percentageDifference(a: number, b: number): number {
  if (a === 0 && b === 0) return 0;
  return (Math.abs(a - b) / ((a + b) / 2)) * 100;
}
