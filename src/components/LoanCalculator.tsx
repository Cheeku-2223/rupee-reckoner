
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Calendar, Percent, ArrowRight, Info } from 'lucide-react';
import { calculateLoanDetails, formatCurrency, LoanDetails } from '@/utils/loanCalculations';
import LoanResultsSummary from './LoanResultsSummary';
import LoanAmortizationTable from './LoanAmortizationTable';
import { useToast } from '@/components/ui/use-toast';

const LoanCalculator: React.FC = () => {
  const { toast } = useToast();
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

  const handlePrincipalChange = (value: number[]) => {
    setLoanDetails(prev => ({ ...prev, principal: value[0] }));
  };

  const handleInterestChange = (value: number[]) => {
    setLoanDetails(prev => ({ ...prev, interestRate: value[0] }));
  };

  const handleTermChange = (value: number[]) => {
    setLoanDetails(prev => ({ ...prev, loanTerm: value[0] }));
  };

  const calculateResults = () => {
    const calculatedResults = calculateLoanDetails(loanDetails);
    setResults(calculatedResults);
    
    toast({
      title: "Calculation Complete",
      description: `Monthly Payment: ${formatCurrency(calculatedResults.monthlyPayment)}`,
    });
  };

  useEffect(() => {
    const calculatedResults = calculateLoanDetails(loanDetails);
    setResults(calculatedResults);
  }, [loanDetails]);

  return (
    <div className="w-full animate-fade-in">
      <Card className="loan-card p-6 rounded-xl mb-6">
        <div className="space-y-6">
          {/* Principal Amount */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <IndianRupee className="text-primary" size={18} />
                <h3 className="text-lg font-medium">Loan Amount</h3>
              </div>
              <div className="text-xl font-bold text-primary">
                {formatCurrency(loanDetails.principal)}
              </div>
            </div>
            
            <Slider 
              value={[loanDetails.principal]} 
              min={100000} 
              max={10000000} 
              step={50000}
              className="py-4"
              onValueChange={handlePrincipalChange}
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹1 Lakh</span>
              <span>₹1 Crore</span>
            </div>
          </div>
          
          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Percent className="text-primary" size={18} />
                <h3 className="text-lg font-medium">Interest Rate</h3>
              </div>
              <div className="text-xl font-bold text-primary">
                {loanDetails.interestRate.toFixed(2)}%
              </div>
            </div>
            
            <Slider 
              value={[loanDetails.interestRate]} 
              min={4} 
              max={20} 
              step={0.25}
              className="py-4"
              onValueChange={handleInterestChange}
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>4.00%</span>
              <span>20.00%</span>
            </div>
          </div>
          
          {/* Loan Term */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={18} />
                <h3 className="text-lg font-medium">Loan Term</h3>
              </div>
              <div className="text-xl font-bold text-primary">
                {Math.floor(loanDetails.loanTerm / 12)} years {loanDetails.loanTerm % 12} months
              </div>
            </div>
            
            <Slider 
              value={[loanDetails.loanTerm]} 
              min={12} 
              max={360} 
              step={6}
              className="py-4"
              onValueChange={handleTermChange}
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary-700 gap-2 py-6 text-lg"
            onClick={calculateResults}
          >
            Calculate <ArrowRight size={18} />
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      <div className="mt-8">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="schedule">Amortization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="animate-fade-in">
            <LoanResultsSummary 
              loanAmount={loanDetails.principal}
              monthlyPayment={results.monthlyPayment}
              totalPayment={results.totalPayment}
              totalInterest={results.totalInterest}
              interestRate={loanDetails.interestRate}
              loanTerm={loanDetails.loanTerm}
            />
          </TabsContent>
          
          <TabsContent value="schedule">
            <LoanAmortizationTable loanDetails={loanDetails} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanCalculator;
