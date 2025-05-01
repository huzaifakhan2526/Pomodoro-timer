import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from './StatsCard';

export default function MonthlyStats({ stats }) {
    return (
        <StatsCard
            title="This Month's Progress"
            workCount={stats.workCount}
            breakCount={stats.breakCount}
        >
            <div className="h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.chartData}>
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="work" fill="#EF4444" name="Work" />
                        <Bar dataKey="break" fill="#10B981" name="Break" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </StatsCard>
    );
}