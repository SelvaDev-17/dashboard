import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/AuditResults.css';

const AuditResults = ({ results, onReset }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleExpand = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    const { overallScore, verdict, categories, url } = results;

    // Circular progress calculation
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (overallScore / 100) * circumference;

    const getScoreColor = (score) => {
        if (score >= 90) return 'var(--accent-success)';
        if (score >= 80) return 'var(--accent-primary)';
        if (score >= 60) return 'var(--accent-warning)';
        return 'var(--accent-error)';
    };

    return (
        <div className="results-container">
            <div className="results-header glass-card">
                <div className="overall-score-wrapper">
                    <div className="circular-chart-container">
                        <svg viewBox="0 0 120 120" className="circular-chart">
                            <circle
                                className="circular-bg"
                                cx="60"
                                cy="60"
                                r={radius}
                            />
                            <circle
                                className="circular-progress"
                                stroke={getScoreColor(overallScore)}
                                strokeDasharray={`${circumference} ${circumference}`}
                                style={{ strokeDashoffset }}
                                cx="60"
                                cy="60"
                                r={radius}
                            />
                        </svg>
                        <div className="score-text">
                            <span className="score-value">{overallScore}</span>
                            <span className="score-label">Overall</span>
                        </div>
                    </div>
                </div>

                <div className="results-summary">
                    <div className="url-badge">{url}</div>
                    <h2 className="verdict-title">{verdict}</h2>
                    <button className="btn-secondary" onClick={onReset}>Start New Audit</button>
                </div>
            </div>

            <div className="categories-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="category-wrapper" onClick={() => toggleExpand(cat.id)}>
                        <CategoryCard category={cat} />
                        {/* If we wanted to make the whole card clickable to expand insights */}
                    </div>
                ))}
            </div>

            <div className="insights-section">
                <h3 className="section-title">Detailed Insights & Recommendations</h3>

                {categories.map((cat) => (
                    <div key={cat.id} className={`insight-group glass-card ${expandedCategory === cat.id ? 'expanded' : ''}`}>
                        <div className="insight-header" onClick={() => toggleExpand(cat.id)}>
                            <div className="insight-title-row">
                                <h4 className="insight-cat-name">{cat.name}</h4>
                                <span className={`status-badge ${cat.score >= 80 ? 'good' : cat.score >= 50 ? 'warning' : 'poor'}`}>
                                    {cat.score >= 80 ? 'Good' : cat.score >= 50 ? 'Needs Improvement' : 'Poor'}
                                </span>
                            </div>
                            {expandedCategory === cat.id ? <ChevronUp /> : <ChevronDown />}
                        </div>

                        {expandedCategory === cat.id && (
                            <div className="insight-content">
                                {cat.issues.length === 0 ? (
                                    <div className="no-issues">
                                        <CheckCircle className="icon-success" size={20} />
                                        <p>No major issues detected. Great job!</p>
                                    </div>
                                ) : (
                                    <ul className="issues-list">
                                        {cat.issues.map((issue, idx) => (
                                            <li key={idx} className={`issue-item ${issue.severity}`}>
                                                <AlertCircle size={18} className="issue-icon" />
                                                <span>{issue.message}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditResults;
