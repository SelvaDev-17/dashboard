import React from 'react';
import * as LucideIcons from 'lucide-react';

const CategoryCard = ({ category }) => {
    const Icon = LucideIcons[category.icon] || LucideIcons.Activity;

    // Determine color based on score
    const getScoreColor = (score) => {
        if (score >= 90) return 'var(--accent-success)';
        if (score >= 50) return 'var(--accent-warning)';
        return 'var(--accent-error)';
    };

    const scoreColor = getScoreColor(category.score);
    const strokeDash = `${category.score}, 100`;

    return (
        <div className="category-card glass-card">
            <div className="card-header">
                <div className="cat-icon-wrapper">
                    <Icon size={24} color="var(--text-primary)" />
                </div>
                <span className="cat-score" style={{ color: scoreColor }}>{category.score}</span>
            </div>
            <h3 className="cat-title">{category.name}</h3>

            <div className="progress-bar-bg">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${category.score}%`, backgroundColor: scoreColor }}
                ></div>
            </div>
        </div>
    );
};

export default CategoryCard;
