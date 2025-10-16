'use client';

export default function HeroStats({ stats }) {
    const cards = [
        {
            label: 'Total Tasks',
            value: stats.total,
            icon: '📋',
            color: 'blue',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-600 dark:text-blue-400',
            borderColor: 'border-blue-200 dark:border-blue-800'
        },
        {
            label: 'Completed',
            value: stats.completed,
            icon: '✅',
            color: 'green',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            textColor: 'text-green-600 dark:text-green-400',
            borderColor: 'border-green-200 dark:border-green-800'
        },
        {
            label: 'Active Tasks',
            value: stats.active,
            icon: '⏳',
            color: 'orange',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-600 dark:text-orange-400',
            borderColor: 'border-orange-200 dark:border-orange-800'
        },
        {
            label: 'Completion Rate',
            value: `${stats.completionRate}%`,
            icon: '📊',
            color: 'purple',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            textColor: 'text-purple-600 dark:text-purple-400',
            borderColor: 'border-purple-200 dark:border-purple-800'
        },
        {
            label: 'Completed Today',
            value: stats.completedToday,
            icon: '🎯',
            color: 'indigo',
            bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
            textColor: 'text-indigo-600 dark:text-indigo-400',
            borderColor: 'border-indigo-200 dark:border-indigo-800'
        },
        {
            label: 'Pomodoro Sessions',
            value: stats.totalPomodoros,
            icon: '🍅',
            color: 'red',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            textColor: 'text-red-600 dark:text-red-400',
            borderColor: 'border-red-200 dark:border-red-800'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {cards.map((card, index) => (
                <div
                    key={card.label}
                    className={`${card.bgColor} ${card.borderColor} border-2 rounded-xl p-4 transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{card.icon}</span>
                        <div className={`${card.textColor} text-3xl font-bold`}>
                            {card.value}
                        </div>
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {card.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
