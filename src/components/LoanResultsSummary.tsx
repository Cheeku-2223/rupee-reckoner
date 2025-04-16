
import React from 'react';
import { Card } from "@/components/ui/card";
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
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="results-card p-5 rounded-xl bg-white shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Monthly Payment</h3>
          <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
        </Card>
        
        <Card className="results-card p-5 rounded-xl bg-white shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Principal</h3>
          <p className="text-2xl font-bold">{formatCurrency(loanAmount)}</p>
        </Card>
        
        <Card className="results-card p-5 rounded-xl bg-white shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Interest</h3>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalInterest)}</p>
          <p className="text-xs text-gray-500 mt-1">
            {(totalInterest / loanAmount * 100).toFixed(1)}% of principal
          </p>
        </Card>
      </div>

      <Card className="results-card p-6 rounded-xl bg-white shadow-md">
        <h3 className="text-lg font-semibold mb-4">Payment Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  className="pie-segment"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span>Principal</span>
                </div>
                <span className="font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                  <span>Interest</span>
                </div>
                <span className="font-medium">{formatCurrency(totalInterest)}</span>
              </div>
              
              <div className="flex items-center justify-between border-t pt-3 mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-400 mr-2"></div>
                  <span className="font-semibold">Total</span>
                </div>
                <span className="font-bold">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 rounded-xl bg-gradient-to-r from-primary-50 to-purple-50 border-l-4 border-primary">
        <div className="text-sm text-gray-700">
          <p className="mb-2">
            A {loanTerm / 12} year loan of {formatCurrency(loanAmount)} at {interestRate}% interest will result in a monthly payment of {formatCurrency(monthlyPayment)}.
          </p>
          <p>
            After paying off the loan, you will have paid {formatCurrency(totalInterest)} in interest, which is {(totalInterest / loanAmount * 100).toFixed(1)}% of your original loan amount.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoanResultsSummary;
