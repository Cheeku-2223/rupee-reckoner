
import React from 'react';
import Header from '@/components/Header';
import LoanCalculator from '@/components/LoanCalculator';

const Index = () => {
  return (
    <div className="page">
      <div className="container">
        <Header />
        <LoanCalculator />
        
        <footer className="footer">
          <p>© 2025 Rupee Reckoner. All rights reserved.</p>
          <p>A professional loan calculation tool for Indian borrowers.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
