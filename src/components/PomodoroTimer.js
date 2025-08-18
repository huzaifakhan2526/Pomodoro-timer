'use client';

import usePomodoro from '@/hooks/usePomodoro';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import FullScreenFocus from './FullScreenFocus';

export default function PomodoroTimer() {
    const {
        mode,
        timerType,
        timeLeft,
        totalTime,
        isPaused,
        showConfirmation,
        completedWorkSessions,
        getBreakType,
        startWorkTimer,
        startBreakTimer,
        togglePause,
        resetTimer,
        changeTimerType,
        confirmTransition,
        exitFullScreen
    } = usePomodoro();

    return (
        <>
            {/* Full Screen Focus Mode */}
            <FullScreenFocus
                mode={mode}
                timeLeft={timeLeft}
                totalTime={totalTime}
                isPaused={isPaused}
                onTogglePause={togglePause}
                onReset={resetTimer}
                onExit={exitFullScreen}
            />

            {/* Regular Timer Interface */}
            <div className="max-w-md mx-auto">
                <TimerDisplay
                    mode={mode}
                    timeLeft={timeLeft}
                    totalTime={totalTime}
                    isPaused={isPaused}
                    showConfirmation={showConfirmation}
                    timerType={timerType}
                    completedWorkSessions={completedWorkSessions}
                    getBreakType={getBreakType}
                    onConfirm={confirmTransition}
                />

                <TimerControls
                    mode={mode}
                    isPaused={isPaused}
                    timerType={timerType}
                    showConfirmation={showConfirmation}
                    completedWorkSessions={completedWorkSessions}
                    getBreakType={getBreakType}
                    onStartWork={startWorkTimer}
                    onStartBreak={startBreakTimer}
                    onTogglePause={togglePause}
                onReset={resetTimer}
                    onChangeTimerType={changeTimerType}
                />
            </div>
        </>
    );
}