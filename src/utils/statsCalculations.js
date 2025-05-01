import { startOfDay, startOfWeek, startOfMonth, format, isSameDay, isSameWeek, isSameMonth } from 'date-fns';

// Calculate daily stats
export const calculateDailyStats = (sessions) => {
    const today = startOfDay(new Date());

    const todaySessions = sessions.filter(session => {
        const sessionDate = new Date(session.timestamp);
        return isSameDay(sessionDate, today);
    });

    const workCount = todaySessions.filter(s => s.type === 'work').length;
    const breakCount = todaySessions.filter(s => s.type === 'break').length;

    return { workCount, breakCount };
};

// Calculate weekly stats
export const calculateWeeklyStats = (sessions) => {
    const currentWeek = startOfWeek(new Date());

    const weekSessions = sessions.filter(session => {
        const sessionDate = new Date(session.timestamp);
        return isSameWeek(sessionDate, currentWeek);
    });

    // Group by day of the week
    const dailyData = weekSessions.reduce((acc, session) => {
        const day = format(new Date(session.timestamp), 'E');

        if (!acc[day]) {
            acc[day] = { work: 0, break: 0 };
        }

        if (session.type === 'work') {
            acc[day].work += 1;
        } else {
            acc[day].break += 1;
        }

        return acc;
    }, {});

    // Convert to array for charts
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const chartData = weekDays.map(day => ({
        day,
        work: dailyData[day]?.work || 0,
        break: dailyData[day]?.break || 0,
    }));

    const workCount = weekSessions.filter(s => s.type === 'work').length;
    const breakCount = weekSessions.filter(s => s.type === 'break').length;

    return {
        workCount,
        breakCount,
        chartData
    };
};

// Calculate monthly stats
export const calculateMonthlyStats = (sessions) => {
    const currentMonth = startOfMonth(new Date());

    const monthSessions = sessions.filter(session => {
        const sessionDate = new Date(session.timestamp);
        return isSameMonth(sessionDate, currentMonth);
    });

    // Group by week of the month
    const weeklyData = monthSessions.reduce((acc, session) => {
        const weekNum = Math.ceil(new Date(session.timestamp).getDate() / 7);
        const weekLabel = `Week ${weekNum}`;

        if (!acc[weekLabel]) {
            acc[weekLabel] = { work: 0, break: 0 };
        }

        if (session.type === 'work') {
            acc[weekLabel].work += 1;
        } else {
            acc[weekLabel].break += 1;
        }

        return acc;
    }, {});

    // Convert to array for charts
    const weeks = Object.keys(weeklyData);
    const chartData = weeks.map(week => ({
        week,
        work: weeklyData[week].work,
        break: weeklyData[week].break,
    }));

    const workCount = monthSessions.filter(s => s.type === 'work').length;
    const breakCount = monthSessions.filter(s => s.type === 'break').length;

    return {
        workCount,
        breakCount,
        chartData
    };
};