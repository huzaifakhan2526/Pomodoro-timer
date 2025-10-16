'use client';

import { useState } from 'react';
import useTodoList from '@/hooks/useTodoList';
import {
    calculateHeroStats,
    calculateStreak,
    calculateCompletionTrend,
    calculatePriorityDistribution,
    calculateBestDay,
    calculateAverageCompletionTime,
    calculateProductivityScore,
    calculateWeeklyHeatmap
} from '@/utils/dashboardCalculations';
import HeroStats from '@/components/Dashboard/HeroStats';
import CompletionTrendChart from '@/components/Dashboard/CompletionTrendChart';
import PriorityChart from '@/components/Dashboard/PriorityChart';
import InsightsCards from '@/components/Dashboard/InsightsCards';
import ActivityHeatmap from '@/components/Dashboard/ActivityHeatmap';

export default function DashboardPage() {
    const { todos } = useTodoList();
    const [dateRange, setDateRange] = useState(30); // 7, 30, 90 days

    // Calculate all statistics
    const heroStats = calculateHeroStats(todos);
    const streak = calculateStreak(todos);
    const completionTrend = calculateCompletionTrend(todos, dateRange);
    const priorityDist = calculatePriorityDistribution(todos);
    const bestDay = calculateBestDay(todos);
    const avgCompletionTime = calculateAverageCompletionTime(todos);
    const productivityScore = calculateProductivityScore(todos);
    const heatmapData = calculateWeeklyHeatmap(todos, 12);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            📊 Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Track your productivity and get insights into your task completion patterns
                        </p>
                    </div>

                    {/* Date Range Filter */}
                    <div className="flex gap-2">
                        {[7, 30, 90].map((days) => (
                            <button
                                key={days}
                                onClick={() => setDateRange(days)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    dateRange === days
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {days}D
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero Statistics */}
            <HeroStats stats={heroStats} />

            {/* Insights Cards */}
            <InsightsCards
                streak={streak}
                bestDay={bestDay}
                avgCompletionTime={avgCompletionTime}
                productivityScore={productivityScore}
            />

            {/* Activity Heatmap */}
            <ActivityHeatmap data={heatmapData} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <CompletionTrendChart data={completionTrend} />
                <PriorityChart data={priorityDist} />
            </div>

            {/* Additional Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    📈 Weekly Distribution
                </h3>
                <div className="grid grid-cols-7 gap-2">
                    {bestDay.distribution.map((day) => (
                        <div key={day.day} className="text-center">
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                {day.day}
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {day.count}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    💡 Productivity Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Focus on High Priority</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Complete high-priority tasks first thing in the morning
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🔥</span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Maintain Your Streak</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Complete at least one task daily to build momentum
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">📊</span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Review Weekly Progress</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Check your dashboard every week to track improvements
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">⚡</span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Break Down Large Tasks</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Divide big tasks into smaller, manageable pieces
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}