import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { UnitTypes } from './components/UnitTypes';
import { PurchaseCalculator } from './components/PurchaseCalculator';
import { Features } from './components/Features';
import { PreviousWork } from './components/PreviousWork';
import { Company } from './components/Company';
import { LeadForm } from './components/LeadForm';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { UnitType } from './types';

function App() {
  const [selectedInterest, setSelectedInterest] = useState<UnitType>('typeA');
  // Initialize as true (Dark Mode Default)
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if user explicitly chose light mode previously
    if (localStorage.theme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode (handles 'dark' in storage or no storage)
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleSelectType = (type: UnitType) => {
    setSelectedInterest(type);
  };

  return (
    <div className="min-h-screen relative">
      {/* Dark Mode Toggle - Fixed Top Left */}
      <button 
        onClick={toggleDarkMode}
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl text-gray-800 dark:text-yellow-400 border border-gray-200 dark:border-gray-700 transition-all hover:scale-110 hover:shadow-2xl hover:ring-2 ring-primary-500/50"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={24} className="animate-spin-slow" /> : <Moon size={24} />}
      </button>

      <Hero />
      <About />
      <UnitTypes onSelectType={handleSelectType} />
      <PurchaseCalculator />
      <Features />
      <PreviousWork />
      <Company />
      <LeadForm selectedInterest={selectedInterest} />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;