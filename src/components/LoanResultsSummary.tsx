
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/utils/loanCalculations';

interface LoanResultsSummaryProps {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  interestRate: number;
  loanTerm: number;
}

const LoanResultsSummary: React.FC<LoanResultsSummaryProps> = ({
  loanAmount,
  monthlyPayment,
  totalPayment,
  totalInterest,
  interestRate,
  loanTerm
}) => {
  const data = [
    { name: 'Principal', value: loanAmount },
    { name: 'Interest', value: totalInterest }
  ];
  
  const COLORS = ['#5E35B1', '#9575CD'];

  return (
    <div className="results-summary fade-in">
      <div className="results-grid">
        <div className="result-card">
          <h3 className="result-label">Monthly Payment</h3>
          <p className="result-value">{formatCurrency(monthlyPayment)}</p>
        </div>
        
        <div className="result-card">
          <h3 className="result-label">Total Principal</h3>
          <p className="result-value normal">{formatCurrency(loanAmount)}</p>
        </div>
        
        <div className="result-card">
          <h3 className="result-label">Total Interest</h3>
          <p className="result-value purple">{formatCurrency(totalInterest)}</p>
          <p className="result-note">
            {(totalInterest / loanAmount * 100).toFixed(1)}% of principal
          </p>
        </div>
      </div>

      <div className="breakdown-card">
        <h3 className="breakdown-title">Payment Breakdown</h3>
        
        <div className="breakdown-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="breakdown-legend">
            <div className="legend-item">
              <div className="legend-label">
                <div className="legend-color primary"></div>
                <span>Principal</span>
              </div>
              <span className="legend-value">{formatCurrency(loanAmount)}</span>
            </div>
            
            <div className="legend-item">
              <div className="legend-label">
                <div className="legend-color secondary"></div>
                <span>Interest</span>
              </div>
              <span className="legend-value">{formatCurrency(totalInterest)}</span>
            </div>
            
            <div className="legend-divider"></div>
            
            <div className="legend-item">
              <div className="legend-label">
                <div className="legend-color total"></div>
                <span className="font-semibold">Total</span>
              </div>
              <span className="legend-value font-bold">{formatCurrency(totalPayment)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-text">
          <p>
            A {loanTerm / 12} year loan of {formatCurrency(loanAmount)} at {interestRate}% interest will result in a monthly payment of {formatCurrency(monthlyPayment)}.
          </p>
          <p>
            After paying off the loan, you will have paid {formatCurrency(totalInterest)} in interest, which is {(totalInterest / loanAmount * 100).toFixed(1)}% of your original loan amount.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanResultsSummary;
