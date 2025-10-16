'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CompletionTrendChart({ data }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Completion Trend (Last 30 Days)
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis 
                            dataKey="date" 
                            stroke="#9CA3AF"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                            stroke="#9CA3AF"
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#F3F4F6'
                            }}
                        />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="completed" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            name="Completed"
                            dot={{ fill: '#10B981', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="created" 
                            stroke="#3B82F6" 
                            strokeWidth={2}
                            name="Created"
                            dot={{ fill: '#3B82F6', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
