import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { runMockAudit } from './utils/mockAudit';
import AuditResults from './components/AuditResults';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleRunAudit = async (url) => {
    setIsAuditing(true);
    // Simulate API call
    const auditData = await runMockAudit(url);
    setResults(auditData);
    setIsAuditing(false);
  };

  return (
    <div className="app-container">
      <div className="container">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="main-content">
          {!results ? (
            <HeroSection onRunAudit={handleRunAudit} isAuditing={isAuditing} />
          ) : (
            <AuditResults results={results} onReset={() => setResults(null)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
