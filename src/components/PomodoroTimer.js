'use client';

import usePomodoro from '@/hooks/usePomodoro';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

export default function PomodoroTimer() {
    const {
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
    } = usePomodoro();

    return (
        <div className="max-w-md mx-auto">
            <TimerDisplay
                mode={mode}
                timeLeft={timeLeft}
                isPaused={isPaused}
                showConfirmation={showConfirmation}
                timerType={timerType}
                onConfirm={confirmTransition}
            />

            <TimerControls
                mode={mode}
                isPaused={isPaused}
                timerType={timerType}
                showConfirmation={showConfirmation}
                onStartWork={startWorkTimer}
                onStartBreak={startBreakTimer}
                onTogglePause={togglePause}
                onReset={resetTimer}
                onChangeTimerType={changeTimerType}
            />
        </div>
    );
}