'use client';

export default function TodoStats({ stats }) {
    const { total, completed, active, completionRate, totalPomodoroSessions } = stats;

    const statsData = [
        {
            label: 'Total Tasks',
            value: total,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            icon: '📝'
        },
        {
            label: 'Completed',
            value: completed,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            icon: '✅'
        },
        {
            label: 'Active',
            value: active,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            icon: '⏳'
        },
        {
            label: 'Completion Rate',
            value: `${completionRate}%`,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            icon: '📊'
        },
        {
            label: 'Pomodoro Sessions',
            value: totalPomodoroSessions,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            icon: '🍅'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {statsData.map((stat, index) => (
                <div
                    key={stat.label}
                    className={`stats-card ${stat.bgColor} rounded-lg p-4 text-center`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
