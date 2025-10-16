import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from './StatsCard';

export default function WeeklyStats({ stats }) {
    const hasData = stats.workCount > 0 || stats.breakCount > 0;
    
    return (
        <StatsCard
            title="This Week's Progress"
            workCount={stats.workCount}
            breakCount={stats.breakCount}
        >
            {hasData ? (
                <div className="h-48 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.chartData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="work" fill="#EF4444" name="Work" />
                            <Bar dataKey="break" fill="#10B981" name="Break" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-48 mt-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                        <p className="text-sm">No sessions this week</p>
                        <p className="text-xs mt-1">Complete some work sessions to see your weekly progress!</p>
                    </div>
                </div>
            )}
        </StatsCard>
    );
}