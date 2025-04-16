
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
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
    <Card className="overflow-hidden rounded-xl animate-fade-in">
      <div className="p-4 bg-gray-50 border-b flex items-center gap-2">
        <Info size={16} className="text-primary" />
        <p className="text-sm text-gray-600">
          Monthly breakdown showing how each payment is applied to principal and interest
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium">Month</TableHead>
              <TableHead className="font-medium text-right">Payment</TableHead>
              <TableHead className="font-medium text-right">Principal</TableHead>
              <TableHead className="font-medium text-right">Interest</TableHead>
              <TableHead className="font-medium text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.map((entry) => (
              <TableRow key={entry.month} className="hover:bg-gray-50">
                <TableCell className="font-medium">{entry.month}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.payment)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.principal)}</TableCell>
                <TableCell className="text-right text-purple-600">{formatCurrency(entry.interest)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.balance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t bg-white">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </Card>
  );
};

export default LoanAmortizationTable;
