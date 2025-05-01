'use client';

import { useState, useEffect } from 'react';
import DailyStats from '@/components/DailyStats';
import WeeklyStats from '@/components/WeeklyStats';
import MonthlyStats from '@/components/MonthlyStats';
import useStats from '@/hooks/useStats';
import { clearAllSessions } from '@/utils/localStorage';

export default function Dashboard() {
    const { dailyStats, weeklyStats, monthlyStats } = useStats();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all timer data? This cannot be undone.')) {
            clearAllSessions();
            window.location.reload();
        }
    };

    if (!isClient) {
        return <div className="text-center py-10">Loading dashboard...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Productivity Dashboard</h1>

                <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Clear All Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <DailyStats stats={dailyStats} />
                <WeeklyStats stats={weeklyStats} />
                <MonthlyStats stats={monthlyStats} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">About Your Data</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Your Pomodoro session data is stored locally on your device and is not sent to any server.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Data is automatically cleaned after 15 days to manage storage usage.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                    You can manually clear all data using the "Clear All Data" button above.
                </p>
            </div>
        </div>
    );
}