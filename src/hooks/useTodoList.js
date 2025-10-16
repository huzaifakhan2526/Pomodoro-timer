'use client';

import { useState, useEffect } from 'react';
import { getTodos, saveTodos, addTodoSession } from '@/utils/todoStorage';

export default function useTodoList() {
    const [todos, setTodos] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load todos from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loadedTodos = getTodos();
            setTodos(loadedTodos);
            setIsInitialized(true);
        }
    }, []);

    // Save todos to localStorage whenever todos change (but only after initialization)
    useEffect(() => {
        if (typeof window !== 'undefined' && isInitialized) {
            saveTodos(todos);
        }
    }, [todos, isInitialized]);

    // Add a new todo
    const addTodo = (text, priority = 'medium') => {
        if (!text.trim()) return;

        const newTodo = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            priority, // low, medium, high
            createdAt: new Date().toISOString(),
            completedAt: null,
            pomodoroSessions: 0
        };

        setTodos(prev => [newTodo, ...prev]);
    };

    // Toggle todo completion
    const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                    completedAt: !todo.completed ? new Date().toISOString() : null
                };
            }
            return todo;
        }));
    };

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    // Edit a todo
    const editTodo = (id, newText, newPriority) => {
        if (!newText.trim()) return;

        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: newText.trim(),
                    priority: newPriority || todo.priority
                };
            }
            return todo;
        }));
    };

    // Clear all completed todos
    const clearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.completed));
    };

    // Add a Pomodoro session to a todo (called when work session completes)
    const addPomodoroSession = (todoId) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    pomodoroSessions: todo.pomodoroSessions + 1
                };
            }
            return todo;
        }));
    };

    // Calculate stats
    const stats = {
        total: todos.length,
        completed: todos.filter(todo => todo.completed).length,
        active: todos.filter(todo => !todo.completed).length,
        completionRate: todos.length > 0 ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100) : 0,
        totalPomodoroSessions: todos.reduce((sum, todo) => sum + todo.pomodoroSessions, 0)
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
        addPomodoroSession,
        stats
    };
}
