
import React from 'react';
import Header from '@/components/Header';
import LoanCalculator from '@/components/LoanCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container max-w-4xl px-4 pt-8">
        <Header />
        <LoanCalculator />
        
        <footer className="mt-16 pt-6 border-t text-center text-sm text-gray-500">
          <p>© 2025 Rupee Reckoner. All rights reserved.</p>
          <p className="mt-1">A professional loan calculation tool for Indian borrowers.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
