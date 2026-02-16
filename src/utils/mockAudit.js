// Simulates an audit process
export const runMockAudit = (url) => {
    return new Promise((resolve) => {
        // Simulate network delay (1.5s to 3s)
        const delay = Math.floor(Math.random() * 1500) + 1500;

        setTimeout(() => {
            resolve(generateResults(url));
        }, delay);
    });
};

const generateResults = (url) => {
    const categories = [
        {
            id: 'accessibility',
            name: 'Accessibility',
            icon: 'User',
            score: randomScore(60, 95),
            issues: [
                { severity: 'high', message: 'Low contrast ratio on primary buttons.' },
                { severity: 'medium', message: 'Missing alt text on several images.' }
            ]
        },
        {
            id: 'hierarchy',
            name: 'Visual Hierarchy',
            icon: 'Layout',
            score: randomScore(70, 98),
            issues: [
                { severity: 'medium', message: 'Heading sizes do not follow a clear sequence.' }
            ]
        },
        {
            id: 'readability',
            name: 'Readability',
            icon: 'BookOpen',
            score: randomScore(80, 100),
            issues: []
        },
        {
            id: 'responsiveness',
            name: 'Responsiveness',
            icon: 'Smartphone',
            score: randomScore(50, 90),
            issues: [
                { severity: 'high', message: 'Horizontal scroll detected on mobile devices.' },
                { severity: 'low', message: 'Tap targets are too small in the footer.' }
            ]
        },
        {
            id: 'performance',
            name: 'Performance',
            icon: 'Zap',
            score: randomScore(40, 95),
            issues: [
                { severity: 'high', message: 'Large layout shifts (CLS) detected during load.' },
                { severity: 'medium', message: 'Images are not lazy-loaded.' }
            ]
        }
    ];

    // Calculate overall score
    const totalScore = categories.reduce((acc, cat) => acc + cat.score, 0);
    const overallScore = Math.round(totalScore / categories.length);

    return {
        url,
        timestamp: new Date().toISOString(),
        overallScore,
        categories,
        verdict: getVerdict(overallScore)
    };
};

const randomScore = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getVerdict = (score) => {
    if (score >= 90) return "Excellent! Your site provides a top-tier user experience.";
    if (score >= 80) return "Great job. A few minor tweaks will make it perfect.";
    if (score >= 60) return "Good, but there's significant room for improvement.";
    return "Needs Attention. Critical UX issues are affecting your users.";
};
