import { useState, useEffect, useRef } from 'react';
import { addSession } from '@/utils/localStorage';

export default function usePomodoro() {
    const [mode, setMode] = useState('idle'); // idle, work, break, paused, completed
    const [timerType, setTimerType] = useState('short'); // short (25/5) or long (50/10)
    const [timeLeft, setTimeLeft] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [completedWorkSessions, setCompletedWorkSessions] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const timerRef = useRef(null);
    const audioRef = useRef(null);

    // Timer durations in seconds
    const durations = {
        short: {
            work: 25 * 60,
            break: 5 * 60,
            longBreak: 15 * 60
        },
        long: {
            work: 50 * 60,
            break: 10 * 60,
            longBreak: 20 * 60
        }
    };

    // Initialize audio
    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio();
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Handle timer countdown
    useEffect(() => {
        if (mode !== 'idle' && mode !== 'completed' && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        playSound(mode === 'work' ? '/sounds/work-end.mp3' : '/sounds/break-end.mp3');

                        // Record completed session
                        if (mode === 'work' || mode === 'break') {
                            const session = {
                                type: mode,
                                duration: mode === 'work'
                                    ? durations[timerType].work
                                    : durations[timerType].break,
                                timestamp: new Date().toISOString()
                            };
                            addSession(session);
                        }

                        if (mode === 'work') {
                            setCompletedWorkSessions(prev => prev + 1);
                            setShowConfirmation(true);
                            setMode('completed');
                        } else if (mode === 'break') {
                            setShowConfirmation(true);
                            setMode('completed');
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [mode, isPaused, timerType, durations]);

    const startWorkTimer = () => {
        const workDuration = durations[timerType].work;
        setTimeLeft(workDuration);
        setTotalTime(workDuration);
        setMode('work');
        setIsPaused(false);
        setShowConfirmation(false);
        setIsFullScreen(true);
    };

    const startBreakTimer = () => {
        // Determine if it's time for a long break (after 4 work sessions)
        const isLongBreak = completedWorkSessions > 0 && completedWorkSessions % 4 === 0;
        const breakDuration = isLongBreak ? durations[timerType].longBreak : durations[timerType].break;
        
        setTimeLeft(breakDuration);
        setTotalTime(breakDuration);
        setMode('break');
        setIsPaused(false);
        setShowConfirmation(false);
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setMode('idle');
        setTimeLeft(0);
        setTotalTime(0);
        setIsPaused(false);
        setShowConfirmation(false);
        setCompletedWorkSessions(0);
        setIsFullScreen(false);
    };

    const changeTimerType = (type) => {
        setTimerType(type);
        resetTimer();
    };

    const getBreakType = () => {
        if (completedWorkSessions === 0) return 'short';
        return completedWorkSessions % 4 === 0 ? 'long' : 'short';
    };

    const exitFullScreen = () => {
        setIsFullScreen(false);
    };

    const confirmTransition = () => {
        if (mode === 'completed') {
            const previousMode = showConfirmation && timeLeft === 0 ? 'work' : 'break';
            if (previousMode === 'work') {
                startBreakTimer();
            } else {
                setMode('idle');
                setShowConfirmation(false);
            }
        }
    };

    const playSound = (soundUrl) => {
        if (audioRef.current) {
            audioRef.current.src = soundUrl;
            audioRef.current.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        }
    };

    return {
        mode,
        timerType,
        timeLeft,
        totalTime,
        isPaused,
        showConfirmation,
        completedWorkSessions,
        isFullScreen,
        getBreakType,
        startWorkTimer,
        startBreakTimer,
        togglePause,
        resetTimer,
        changeTimerType,
        confirmTransition,
        exitFullScreen
    };
}