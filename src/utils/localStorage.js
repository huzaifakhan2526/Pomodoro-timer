const STORAGE_KEY = 'pomodoro-sessions';
const MAX_DAYS = 15;

// Get all sessions from localStorage
export const getSessions = () => {
    if (typeof window === 'undefined') return [];

    try {
        const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return sessions;
    } catch (error) {
        console.error('Error getting sessions from localStorage:', error);
        return [];
    }
};

// Add a new session to localStorage
export const addSession = (session) => {
    if (typeof window === 'undefined') return;

    try {
        const sessions = getSessions();
        const newSessions = [session, ...sessions];

        // Clean up old data (older than 15 days)
        const cleanedSessions = cleanupOldSessions(newSessions);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedSessions));
    } catch (error) {
        console.error('Error adding session to localStorage:', error);
    }
};

// Clean up sessions older than MAX_DAYS
const cleanupOldSessions = (sessions) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_DAYS);

    return sessions.filter(session => {
        const sessionDate = new Date(session.timestamp);
        return sessionDate >= cutoffDate;
    });
};

// Clear all sessions
export const clearAllSessions = () => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing sessions from localStorage:', error);
    }
};