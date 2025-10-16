'use client';

export default function InsightsCards({ streak, bestDay, avgCompletionTime, productivityScore }) {
    const insights = [
        {
            title: 'Current Streak',
            value: `${streak.current} days`,
            subtitle: `Best: ${streak.best} days`,
            icon: '🔥',
            color: 'orange',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-600 dark:text-orange-400',
            borderColor: 'border-orange-200 dark:border-orange-800'
        },
        {
            title: 'Best Day',
            value: bestDay.day,
            subtitle: `${bestDay.count} tasks completed`,
            icon: '⭐',
            color: 'yellow',
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            textColor: 'text-yellow-600 dark:text-yellow-400',
            borderColor: 'border-yellow-200 dark:border-yellow-800'
        },
        {
            title: 'Avg Completion',
            value: `${avgCompletionTime} days`,
            subtitle: 'From creation to done',
            icon: '⏱️',
            color: 'cyan',
            bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
            textColor: 'text-cyan-600 dark:text-cyan-400',
            borderColor: 'border-cyan-200 dark:border-cyan-800'
        },
        {
            title: 'Productivity Score',
            value: `${productivityScore}/100`,
            subtitle: getScoreMessage(productivityScore),
            icon: '🎯',
            color: 'purple',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            textColor: 'text-purple-600 dark:text-purple-400',
            borderColor: 'border-purple-200 dark:border-purple-800'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {insights.map((insight, index) => (
                <div
                    key={insight.title}
                    className={`${insight.bgColor} ${insight.borderColor} border-2 rounded-xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{insight.icon}</span>
                        <div className={`${insight.textColor} text-3xl font-bold`}>
                            {insight.value}
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.subtitle}
                    </p>
                </div>
            ))}
        </div>
    );
}

function getScoreMessage(score) {
    if (score >= 90) return 'Excellent! 🚀';
    if (score >= 75) return 'Great job! 💪';
    if (score >= 60) return 'Good progress! 👍';
    if (score >= 40) return 'Keep going! 📈';
    return 'Room to improve 💡';
}
