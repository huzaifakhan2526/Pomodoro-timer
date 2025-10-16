'use client';

import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('medium');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTodo(text, priority);
            setText('');
            setPriority('medium');
            setIsExpanded(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setIsExpanded(true)}
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        Add Task
                    </button>
                </div>

                {isExpanded && (
                    <div className="flex items-center justify-between animate-fadeIn">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Priority:
                            </span>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => setPriority('low')}
                                    className={`p-2 rounded-md transition-colors ${
                                        priority === 'low'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    title="Low Priority"
                                >
                                    <span className="text-lg">🌱</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPriority('medium')}
                                    className={`p-2 rounded-md transition-colors ${
                                        priority === 'medium'
                                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    title="Medium Priority"
                                >
                                    <span className="text-lg">⚡</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPriority('high')}
                                    className={`p-2 rounded-md transition-colors ${
                                        priority === 'high'
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    title="High Priority"
                                >
                                    <span className="text-lg">🔥</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Press Enter to add
                            </span>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
