import { startOfDay, startOfWeek, startOfMonth, endOfDay, isWithinInterval, differenceInDays, format, parseISO, isSameDay } from 'date-fns';

// Calculate hero statistics
export const calculateHeroStats = (todos) => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = todos.filter(t => !t.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Today's completed tasks
    const today = startOfDay(new Date());
    const completedToday = todos.filter(t => {
        if (!t.completed || !t.completedAt) return false;
        const completedDate = startOfDay(parseISO(t.completedAt));
        return isSameDay(completedDate, today);
    }).length;

    // Total Pomodoro sessions
    const totalPomodoros = todos.reduce((sum, todo) => sum + (todo.pomodoroSessions || 0), 0);

    return {
        total,
        completed,
        active,
        completionRate,
        completedToday,
        totalPomodoros
    };
};

// Calculate streak (consecutive days with completed tasks)
export const calculateStreak = (todos) => {
    const completedTodos = todos.filter(t => t.completed && t.completedAt);
    
    if (completedTodos.length === 0) return { current: 0, best: 0 };

    // Group by date
    const dateMap = new Map();
    completedTodos.forEach(todo => {
        const date = format(startOfDay(parseISO(todo.completedAt)), 'yyyy-MM-dd');
        dateMap.set(date, true);
    });

    const sortedDates = Array.from(dateMap.keys()).sort().reverse();
    
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;
    let expectedDate = format(startOfDay(new Date()), 'yyyy-MM-dd');

    // Calculate current streak
    for (const date of sortedDates) {
        if (date === expectedDate) {
            currentStreak++;
            const prevDay = new Date(expectedDate);
            prevDay.setDate(prevDay.getDate() - 1);
            expectedDate = format(prevDay, 'yyyy-MM-dd');
        } else {
            break;
        }
    }

    // Calculate best streak
    for (let i = 0; i < sortedDates.length; i++) {
        tempStreak = 1;
        for (let j = i + 1; j < sortedDates.length; j++) {
            const diff = differenceInDays(parseISO(sortedDates[j - 1]), parseISO(sortedDates[j]));
            if (diff === 1) {
                tempStreak++;
            } else {
                break;
            }
        }
        bestStreak = Math.max(bestStreak, tempStreak);
    }

    return { current: currentStreak, best: Math.max(bestStreak, currentStreak) };
};

// Calculate completion trend for charts
export const calculateCompletionTrend = (todos, days = 30) => {
    const trend = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
        
        const completed = todos.filter(t => {
            if (!t.completed || !t.completedAt) return false;
            const completedDate = format(startOfDay(parseISO(t.completedAt)), 'yyyy-MM-dd');
            return completedDate === dateStr;
        }).length;

        const created = todos.filter(t => {
            const createdDate = format(startOfDay(parseISO(t.createdAt)), 'yyyy-MM-dd');
            return createdDate === dateStr;
        }).length;

        trend.push({
            date: format(date, 'MMM dd'),
            completed,
            created,
            fullDate: dateStr
        });
    }

    return trend;
};

// Calculate priority distribution
export const calculatePriorityDistribution = (todos) => {
    const high = todos.filter(t => t.priority === 'high').length;
    const medium = todos.filter(t => t.priority === 'medium').length;
    const low = todos.filter(t => t.priority === 'low').length;

    return [
        { name: 'High', value: high, color: '#EF4444' },
        { name: 'Medium', value: medium, color: '#F59E0B' },
        { name: 'Low', value: low, color: '#10B981' }
    ];
};

// Calculate priority completion rates
export const calculatePriorityCompletion = (todos) => {
    const priorities = ['high', 'medium', 'low'];
    
    return priorities.map(priority => {
        const total = todos.filter(t => t.priority === priority).length;
        const completed = todos.filter(t => t.priority === priority && t.completed).length;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            priority,
            total,
            completed,
            rate
        };
    });
};

// Calculate best performing day of week
export const calculateBestDay = (todos) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCount = new Array(7).fill(0);

    todos.filter(t => t.completed && t.completedAt).forEach(todo => {
        const day = new Date(todo.completedAt).getDay();
        dayCount[day]++;
    });

    const maxCount = Math.max(...dayCount);
    const bestDayIndex = dayCount.indexOf(maxCount);

    return {
        day: days[bestDayIndex],
        count: maxCount,
        distribution: days.map((day, index) => ({
            day,
            count: dayCount[index]
        }))
    };
};

// Calculate average completion time
export const calculateAverageCompletionTime = (todos) => {
    const completedTodos = todos.filter(t => t.completed && t.completedAt);
    
    if (completedTodos.length === 0) return 0;

    const totalDays = completedTodos.reduce((sum, todo) => {
        const created = parseISO(todo.createdAt);
        const completed = parseISO(todo.completedAt);
        return sum + differenceInDays(completed, created);
    }, 0);

    return Math.round(totalDays / completedTodos.length);
};

// Calculate productivity score (0-100)
export const calculateProductivityScore = (todos) => {
    if (todos.length === 0) return 0;

    const completed = todos.filter(t => t.completed).length;
    const completionRate = (completed / todos.length) * 40; // 40% weight

    const streak = calculateStreak(todos);
    const streakScore = Math.min((streak.current / 7) * 30, 30); // 30% weight, max at 7 days

    const highPriorityCompleted = todos.filter(t => t.priority === 'high' && t.completed).length;
    const highPriorityTotal = todos.filter(t => t.priority === 'high').length;
    const priorityScore = highPriorityTotal > 0 ? (highPriorityCompleted / highPriorityTotal) * 30 : 30; // 30% weight

    return Math.round(completionRate + streakScore + priorityScore);
};

// Calculate weekly heatmap data
export const calculateWeeklyHeatmap = (todos, weeks = 12) => {
    const heatmapData = [];
    const today = new Date();
    
    for (let week = weeks - 1; week >= 0; week--) {
        const weekData = [];
        
        for (let day = 0; day < 7; day++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (week * 7 + (6 - day)));
            const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
            
            const count = todos.filter(t => {
                if (!t.completed || !t.completedAt) return false;
                const completedDate = format(startOfDay(parseISO(t.completedAt)), 'yyyy-MM-dd');
                return completedDate === dateStr;
            }).length;

            weekData.push({
                date: dateStr,
                count,
                day: format(date, 'EEE')
            });
        }
        
        heatmapData.push(weekData);
    }

    return heatmapData;
};

// Calculate task velocity (tasks per week)
export const calculateTaskVelocity = (todos, weeks = 4) => {
    const today = new Date();
    const velocityData = [];

    for (let i = weeks - 1; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - (i * 7 + 6));
        const weekEnd = new Date(today);
        weekEnd.setDate(weekEnd.getDate() - (i * 7));

        const completed = todos.filter(t => {
            if (!t.completed || !t.completedAt) return false;
            const completedDate = parseISO(t.completedAt);
            return isWithinInterval(completedDate, { start: startOfDay(weekStart), end: endOfDay(weekEnd) });
        }).length;

        velocityData.push({
            week: `Week ${weeks - i}`,
            completed,
            label: format(weekStart, 'MMM dd')
        });
    }

    return velocityData;
};
