import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import '../styles/HeroSection.css';

const HeroSection = ({ onRunAudit, isAuditing }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url && !isAuditing) {
            onRunAudit(url);
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h2 className="hero-title">
                    Instantly Analyze Your <span className="gradient-text">UX Performance</span>
                </h2>
                <p className="hero-subtitle">
                    Get actionable insights to improve conversion, accessibility, and user satisfaction without any backend code.
                </p>

                <form className="url-input-container glass-card" onSubmit={handleSubmit}>
                    <Search className="input-icon" size={20} />
                    <input
                        type="url"
                        placeholder="Enter website URL (e.g., https://example.com)"
                        className="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        pattern="https?://.+"
                    />
                    <button
                        type="submit"
                        className={`btn-primary ${isAuditing ? 'disabled' : ''}`}
                        disabled={isAuditing}
                    >
                        {isAuditing ? (
                            <>
                                <Loader2 size={18} className="spinner" /> Analyzing...
                            </>
                        ) : (
                            'Run Audit'
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default HeroSection;
