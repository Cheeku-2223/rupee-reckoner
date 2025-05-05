
import React, { useState } from 'react';
import { Pagination } from '@/components/Pagination';
import { generateAmortizationSchedule, formatCurrency, LoanDetails } from '@/utils/loanCalculations';
import { Info } from 'lucide-react';

interface LoanAmortizationTableProps {
  loanDetails: LoanDetails;
}

const LoanAmortizationTable: React.FC<LoanAmortizationTableProps> = ({ loanDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12; // One year at a time
  
  const schedule = generateAmortizationSchedule(loanDetails);
  const totalPages = Math.ceil(schedule.length / rowsPerPage);
  
  const currentPageData = schedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="amortization-table">
      <div className="table-header">
        <Info size={16} />
        <p className="table-header-text">
          Monthly breakdown showing how each payment is applied to principal and interest
        </p>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Month</th>
              <th className="right">Payment</th>
              <th className="right">Principal</th>
              <th className="right">Interest</th>
              <th className="right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((entry) => (
              <tr key={entry.month}>
                <td className="font-medium">{entry.month}</td>
                <td className="right">{formatCurrency(entry.payment)}</td>
                <td className="right">{formatCurrency(entry.principal)}</td>
                <td className="right interest">{formatCurrency(entry.interest)}</td>
                <td className="right">{formatCurrency(entry.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
};

export default LoanAmortizationTable;
