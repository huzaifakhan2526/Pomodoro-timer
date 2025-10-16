'use client';

import { useState } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo, filter }) {
    const [sortBy, setSortBy] = useState('created'); // created, priority, text

    const sortedTodos = [...todos].sort((a, b) => {
        switch (sortBy) {
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'text':
                return a.text.localeCompare(b.text);
            case 'created':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    if (todos.length === 0) {
        return (
        <div className="text-center py-12">
            <div className="empty-state-icon w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {filter === 'completed' ? 'No completed tasks' : 
                     filter === 'active' ? 'No active tasks' : 'No tasks yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {filter === 'completed' ? 'Complete some tasks to see them here' :
                     filter === 'active' ? 'All tasks are completed! 🎉' :
                     'Add your first task to get started'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Sort Controls */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sort:
                    </span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setSortBy('created')}
                            className={`p-2 rounded-md transition-colors ${
                                sortBy === 'created'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title="Sort by Date Created"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSortBy('priority')}
                            className={`p-2 rounded-md transition-colors ${
                                sortBy === 'priority'
                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title="Sort by Priority"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSortBy('text')}
                            className={`p-2 rounded-md transition-colors ${
                                sortBy === 'text'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title="Sort Alphabetically"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {todos.length} task{todos.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Todo Items */}
            <div className="space-y-3">
                {sortedTodos.map((todo, index) => (
                    <div
                        key={todo.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <TodoItem
                            todo={todo}
                            onToggle={onToggleTodo}
                            onDelete={onDeleteTodo}
                            onEdit={onEditTodo}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
