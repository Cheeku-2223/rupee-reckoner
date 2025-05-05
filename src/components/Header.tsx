
import React from 'react';
import { Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-logo-icon">
          <Calculator />
        </div>
        <h1 className="header-title">Rupee Reckoner</h1>
      </div>
      <p className="header-subtitle">Professional Loan Calculator</p>
    </header>
  );
};

export default Header;
