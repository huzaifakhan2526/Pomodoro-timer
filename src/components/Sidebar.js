'use client';

import { useState, useEffect } from 'react';
import useTodoList from '@/hooks/useTodoList';

export default function Sidebar() {
    const { stats } = useTodoList();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const statsData = [
        {
            label: 'Total Tasks',
            value: stats.total,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            icon: '📝'
        },
        {
            label: 'Completed',
            value: stats.completed,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            icon: '✅'
        },
        {
            label: 'Active',
            value: stats.active,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            icon: '⏳'
        },
        {
            label: 'Completion Rate',
            value: `${stats.completionRate}%`,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            icon: '📊'
        },
        {
            label: 'Pomodoro Sessions',
            value: stats.totalPomodoroSessions,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            icon: '🍅'
        }
    ];

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <div className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 fixed left-0 top-16 bottom-0 z-40 ${
                isMobile 
                    ? (isMobileOpen ? 'w-64' : '-left-64')
                    : (isCollapsed ? 'w-16 sidebar-collapsed' : 'w-64')
            }`}>
            {/* Toggle Button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={toggleSidebar}
                    className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                    <svg 
                        className={`w-5 h-5 transition-transform ${
                            isMobile ? (isMobileOpen ? 'rotate-180' : '') : (isCollapsed ? 'rotate-180' : '')
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Stats */}
            <div className="p-4 space-y-3">
                <h3 className={`font-semibold text-gray-900 dark:text-white mb-4 ${
                    (isMobile && !isMobileOpen) || (!isMobile && isCollapsed) ? 'hidden' : ''
                }`}>
                    Productivity Stats
                </h3>
                
                {statsData.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`${stat.bgColor} rounded-lg p-3 transition-all duration-200 hover:scale-105 ${
                            (isMobile && !isMobileOpen) || (!isMobile && isCollapsed) ? 'flex items-center justify-center' : ''
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        title={(isMobile && !isMobileOpen) || (!isMobile && isCollapsed) ? stat.label : ''}
                    >
                        {(isMobile && !isMobileOpen) || (!isMobile && isCollapsed) ? (
                            <div className="text-center">
                                <div className="text-xl mb-1">{stat.icon}</div>
                                <div className={`text-lg font-bold ${stat.color}`}>
                                    {stat.value}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-lg">{stat.icon}</div>
                                    <div className={`text-xl font-bold ${stat.color}`}>
                                        {stat.value}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
