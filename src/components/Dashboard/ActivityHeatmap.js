'use client';

export default function ActivityHeatmap({ data }) {
    const getColor = (count) => {
        if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
        if (count <= 2) return 'bg-green-200 dark:bg-green-900';
        if (count <= 4) return 'bg-green-400 dark:bg-green-700';
        if (count <= 6) return 'bg-green-600 dark:bg-green-500';
        return 'bg-green-800 dark:bg-green-400';
    };

    const maxCount = Math.max(...data.flat().map(d => d.count));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Activity Heatmap (Last 12 Weeks)
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
                    <div className="flex gap-1">
                        {[0, 1, 3, 5, 7].map((threshold) => (
                            <div
                                key={threshold}
                                className={`w-3 h-3 rounded-sm ${getColor(threshold)}`}
                                title={`${threshold}+ tasks`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="inline-grid grid-flow-col gap-1" style={{ gridAutoColumns: 'minmax(0, 1fr)' }}>
                    {data.map((week, weekIndex) => (
                        <div key={weekIndex} className="grid gap-1">
                            {week.map((day, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-all duration-200 hover:scale-150 hover:shadow-lg`}
                                    title={`${day.date}: ${day.count} task${day.count !== 1 ? 's' : ''} completed`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Each square represents a day</span>
                <span>Hover for details</span>
            </div>
        </div>
    );
}
