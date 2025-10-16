const TODOS_STORAGE_KEY = 'pomodoro-todos';
const MAX_DAYS = 30; // Keep todos for 30 days

// Get all todos from localStorage
export const getTodos = () => {
    if (typeof window === 'undefined') return [];

    try {
        const todos = JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY) || '[]');
        return todos;
    } catch (error) {
        console.error('Error getting todos from localStorage:', error);
        return [];
    }
};

// Save todos to localStorage
export const saveTodos = (todos) => {
    if (typeof window === 'undefined') return;

    try {
        // Clean up old todos (older than 30 days)
        const cleanedTodos = cleanupOldTodos(todos);
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(cleanedTodos));
    } catch (error) {
        console.error('Error saving todos to localStorage:', error);
    }
};

// Clean up todos older than MAX_DAYS
const cleanupOldTodos = (todos) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_DAYS);

    return todos.filter(todo => {
        const todoDate = new Date(todo.createdAt);
        return todoDate >= cutoffDate;
    });
};

// Add a Pomodoro session to a specific todo
export const addTodoSession = (todoId) => {
    if (typeof window === 'undefined') return;

    try {
        const todos = getTodos();
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    pomodoroSessions: todo.pomodoroSessions + 1
                };
            }
            return todo;
        });
        saveTodos(updatedTodos);
    } catch (error) {
        console.error('Error adding Pomodoro session to todo:', error);
    }
};

// Clear all todos
export const clearAllTodos = () => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(TODOS_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing todos from localStorage:', error);
    }
};

// Get todos by priority
export const getTodosByPriority = (todos, priority) => {
    return todos.filter(todo => todo.priority === priority);
};

// Get completed todos for a specific date range
export const getCompletedTodosInRange = (todos, startDate, endDate) => {
    return todos.filter(todo => {
        if (!todo.completed || !todo.completedAt) return false;
        const completedDate = new Date(todo.completedAt);
        return completedDate >= startDate && completedDate <= endDate;
    });
};
