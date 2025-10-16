import StatsCard from './StatsCard';

export default function DailyStats({ stats }) {
    const hasData = stats.workCount > 0 || stats.breakCount > 0;
    
    return (
        <StatsCard
            title="Today's Progress"
            workCount={stats.workCount}
            breakCount={stats.breakCount}
        >
            {hasData ? (
                <div className="flex justify-center mt-2">
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-500"
                            style={{
                                width: `${(stats.workCount / (stats.workCount + stats.breakCount) * 100)}%`
                            }}
                        ></div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-4 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No sessions completed today</p>
                    <p className="text-xs mt-1">Start a work session to see your progress!</p>
                </div>
            )}
        </StatsCard>
    );
}