export default function StatsCard({ title, workCount, breakCount, children }) {
    return (
        <div className="stats-card">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>

            <div className="flex justify-between mb-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">{workCount}</div>
                    <div className="text-sm text-gray-500">Work Sessions</div>
                </div>

                <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">{breakCount}</div>
                    <div className="text-sm text-gray-500">Break Sessions</div>
                </div>
            </div>

            {children}
        </div>
    );
}