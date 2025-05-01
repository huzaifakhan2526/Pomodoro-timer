import StatsCard from './StatsCard';

export default function DailyStats({ stats }) {
    return (
        <StatsCard
            title="Today's Progress"
            workCount={stats.workCount}
            breakCount={stats.breakCount}
        >
            <div className="flex justify-center mt-2">
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-red-500"
                        style={{
                            width: `${stats.workCount + stats.breakCount > 0
                                ? (stats.workCount / (stats.workCount + stats.breakCount) * 100)
                                : 0}%`
                        }}
                    ></div>
                </div>
            </div>
        </StatsCard>
    );
}