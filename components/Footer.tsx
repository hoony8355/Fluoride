
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {currentYear} High-Fluoride Toothpaste Info Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
