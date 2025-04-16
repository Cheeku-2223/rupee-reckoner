
import React from 'react';
import { IndianRupee, Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-8">
      <div className="flex items-center justify-center gap-3">
        <div className="bg-primary rounded-full p-3 shadow-lg">
          <Calculator size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Rupee Reckoner
        </h1>
      </div>
      <p className="text-center text-gray-500 mt-2">Professional Loan Calculator</p>
    </header>
  );
};

export default Header;
