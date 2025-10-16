'use client';

import { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import useTodoList from '@/hooks/useTodoList';

export default function Home() {
    const {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted
    } = useTodoList();

    const [filter, setFilter] = useState('all'); // all, active, completed

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Todo List
                </h1>
                <p className="text-center text-gray-600 text-lg">
                    Organize your tasks and boost productivity with focused work sessions
                </p>
            </div>

            {/* Add Todo Form */}
            <AddTodo onAddTodo={addTodo} />

            {/* Filter Tabs */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {[
                        { key: 'all', label: 'All', count: todos.length },
                        { key: 'active', label: 'Active', count: todos.filter(t => !t.completed).length },
                        { key: 'completed', label: 'Completed', count: todos.filter(t => t.completed).length }
                    ].map(({ key, label, count }) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`filter-tab px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                filter === key
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {label} ({count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Todo List */}
            <TodoList
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
                filter={filter}
            />

            {/* Clear Completed Button */}
            {todos.some(todo => todo.completed) && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={clearCompleted}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors text-sm font-medium"
                    >
                        Clear Completed ({todos.filter(t => t.completed).length})
                    </button>
                </div>
            )}
        </div>
    );
}