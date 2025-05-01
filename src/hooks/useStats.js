'use client';

import { useState, useEffect } from 'react';
import { getSessions } from '@/utils/localStorage';
import {
    calculateDailyStats,
    calculateWeeklyStats,
    calculateMonthlyStats
} from '@/utils/statsCalculations';

export default function useStats() {
    const [sessions, setSessions] = useState([]);
    const [dailyStats, setDailyStats] = useState({ workCount: 0, breakCount: 0 });
    const [weeklyStats, setWeeklyStats] = useState({
        workCount: 0,
        breakCount: 0,
        chartData: []
    });
    const [monthlyStats, setMonthlyStats] = useState({
        workCount: 0,
        breakCount: 0,
        chartData: []
    });

    // Load sessions data
    useEffect(() => {
        const loadSessions = () => {
            const loadedSessions = getSessions();
            setSessions(loadedSessions);
        };

        loadSessions();

        // Set up interval to check for updates
        const interval = setInterval(loadSessions, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Calculate stats when sessions change
    useEffect(() => {
        if (sessions.length > 0) {
            setDailyStats(calculateDailyStats(sessions));
            setWeeklyStats(calculateWeeklyStats(sessions));
            setMonthlyStats(calculateMonthlyStats(sessions));
        }
    }, [sessions]);

    return {
        dailyStats,
        weeklyStats,
        monthlyStats,
    };
}