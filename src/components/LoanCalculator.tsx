
import React, { useState, useEffect } from 'react';
import { IndianRupee, Calendar, Percent, ArrowRight, Info } from 'lucide-react';
import { calculateLoanDetails, formatCurrency, LoanDetails } from '@/utils/loanCalculations';
import LoanResultsSummary from './LoanResultsSummary';
import LoanAmortizationTable from './LoanAmortizationTable';

const LoanCalculator: React.FC = () => {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    principal: 1000000, // Default: 10 lakh rupees
    interestRate: 8.5,  // Default: 8.5%
    loanTerm: 60        // Default: 5 years (60 months)
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
  });

  const [activeTab, setActiveTab] = useState('summary');

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanDetails(prev => ({ ...prev, principal: Number(e.target.value) }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanDetails(prev => ({ ...prev, interestRate: Number(e.target.value) }));
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanDetails(prev => ({ ...prev, loanTerm: Number(e.target.value) }));
  };

  const calculateResults = () => {
    const calculatedResults = calculateLoanDetails(loanDetails);
    setResults(calculatedResults);
    
    alert(`Calculation Complete. Monthly Payment: ${formatCurrency(calculatedResults.monthlyPayment)}`);
  };

  useEffect(() => {
    const calculatedResults = calculateLoanDetails(loanDetails);
    setResults(calculatedResults);
  }, [loanDetails]);

  return (
    <div className="loan-calculator fade-in">
      <div className="loan-card">
        <div className="slider-group">
          <div className="slider-header">
            <div className="slider-label">
              <IndianRupee size={18} />
              <h3 className="slider-title">Loan Amount</h3>
            </div>
            <div className="slider-value">
              {formatCurrency(loanDetails.principal)}
            </div>
          </div>
          
          <input 
            type="range" 
            className="slider-input" 
            min={100000} 
            max={10000000} 
            step={50000}
            value={loanDetails.principal}
            onChange={handlePrincipalChange}
          />
          
          <div className="slider-range">
            <span>₹1 Lakh</span>
            <span>₹1 Crore</span>
          </div>
        </div>
        
        <div className="slider-group">
          <div className="slider-header">
            <div className="slider-label">
              <Percent size={18} />
              <h3 className="slider-title">Interest Rate</h3>
            </div>
            <div className="slider-value">
              {loanDetails.interestRate.toFixed(2)}%
            </div>
          </div>
          
          <input 
            type="range" 
            className="slider-input" 
            min={4} 
            max={20} 
            step={0.25}
            value={loanDetails.interestRate}
            onChange={handleInterestChange}
          />
          
          <div className="slider-range">
            <span>4.00%</span>
            <span>20.00%</span>
          </div>
        </div>
        
        <div className="slider-group">
          <div className="slider-header">
            <div className="slider-label">
              <Calendar size={18} />
              <h3 className="slider-title">Loan Term</h3>
            </div>
            <div className="slider-value">
              {Math.floor(loanDetails.loanTerm / 12)} years {loanDetails.loanTerm % 12} months
            </div>
          </div>
          
          <input 
            type="range" 
            className="slider-input" 
            min={12} 
            max={360} 
            step={6}
            value={loanDetails.loanTerm}
            onChange={handleTermChange}
          />
          
          <div className="slider-range">
            <span>1 Year</span>
            <span>30 Years</span>
          </div>
        </div>

        <button 
          className="calculate-button"
          onClick={calculateResults}
        >
          Calculate <ArrowRight size={18} />
        </button>
      </div>

      <div className="tabs">
        <div className="tabs-list">
          <button 
            className="tab-trigger" 
            data-state={activeTab === 'summary' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className="tab-trigger"
            data-state={activeTab === 'schedule' ? 'active' : 'inactive'} 
            onClick={() => setActiveTab('schedule')}
          >
            Amortization
          </button>
        </div>
        
        <div 
          className="tab-content"
          data-state={activeTab === 'summary' ? 'active' : 'inactive'}
        >
          <LoanResultsSummary 
            loanAmount={loanDetails.principal}
            monthlyPayment={results.monthlyPayment}
            totalPayment={results.totalPayment}
            totalInterest={results.totalInterest}
            interestRate={loanDetails.interestRate}
            loanTerm={loanDetails.loanTerm}
          />
        </div>
        
        <div 
          className="tab-content"
          data-state={activeTab === 'schedule' ? 'active' : 'inactive'}
        >
          <LoanAmortizationTable loanDetails={loanDetails} />
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
