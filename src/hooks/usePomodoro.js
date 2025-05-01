import { useState, useEffect, useRef } from 'react';
import { addSession } from '@/utils/localStorage';

export default function usePomodoro() {
    const [mode, setMode] = useState('idle'); // idle, work, break, paused, completed
    const [timerType, setTimerType] = useState('short'); // short (25/5) or long (50/10)
    const [timeLeft, setTimeLeft] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const timerRef = useRef(null);
    const audioRef = useRef(null);

    // Timer durations in seconds
    const durations = {
        short: {
            work: 25 * 60,
            break: 5 * 60
        },
        long: {
            work: 50 * 60,
            break: 10 * 60
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
        setTimeLeft(durations[timerType].work);
        setMode('work');
        setIsPaused(false);
        setShowConfirmation(false);
    };

    const startBreakTimer = () => {
        setTimeLeft(durations[timerType].break);
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
        setIsPaused(false);
        setShowConfirmation(false);
    };

    const changeTimerType = (type) => {
        setTimerType(type);
        resetTimer();
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
        isPaused,
        showConfirmation,
        startWorkTimer,
        startBreakTimer,
        togglePause,
        resetTimer,
        changeTimerType,
        confirmTransition
    };
}