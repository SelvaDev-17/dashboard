import React from 'react';
import { Moon, Sun, LayoutTemplate } from 'lucide-react';
import '../styles/Header.css';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header glass-card">
      <div className="logo-container">
        <div className="logo-icon">
            <LayoutTemplate size={24} color="var(--accent-primary)" />
        </div>
        <h1 className="logo-text">UX Audit Dashboard</h1>
      </div>
      
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun size={20} className="icon-sun" />
        ) : (
          <Moon size={20} className="icon-moon" />
        )}
      </button>
    </header>
  );
};

export default Header;
