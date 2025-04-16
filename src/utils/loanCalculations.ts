
export interface LoanDetails {
  principal: number;
  interestRate: number; // annual rate in percentage
  loanTerm: number; // in months
}

export interface PaymentDetails {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// Calculate monthly payment using the formula: P × r(1+r)^n / ((1+r)^n - 1)
export function calculateMonthlyPayment(loan: LoanDetails): number {
  if (loan.principal <= 0 || loan.interestRate <= 0 || loan.loanTerm <= 0) {
    return 0;
  }
  
  const principal = loan.principal;
  const monthlyRate = loan.interestRate / 100 / 12;
  const termInMonths = loan.loanTerm;
  
  if (monthlyRate === 0) return principal / termInMonths;
  
  const x = Math.pow(1 + monthlyRate, termInMonths);
  const monthly = (principal * x * monthlyRate) / (x - 1);
  
  return monthly;
}

export function calculateLoanDetails(loan: LoanDetails): PaymentDetails {
  const monthlyPayment = calculateMonthlyPayment(loan);
  const totalPayment = monthlyPayment * loan.loanTerm;
  const totalInterest = totalPayment - loan.principal;
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest
  };
}

export function generateAmortizationSchedule(loan: LoanDetails): AmortizationEntry[] {
  const monthlyPayment = calculateMonthlyPayment(loan);
  const monthlyRate = loan.interestRate / 100 / 12;
  let balance = loan.principal;
  const schedule: AmortizationEntry[] = [];
  
  for (let month = 1; month <= loan.loanTerm; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = balance - principal;
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance: balance > 0 ? balance : 0
    });
  }
  
  return schedule;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
