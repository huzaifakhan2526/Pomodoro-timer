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
        isFullScreen,
        showTimerTypeConfirm,
        pendingTimerType,
        getBreakType,
        startWorkTimer,
        startBreakTimer,
        togglePause,
        resetTimer,
        changeTimerType,
        confirmTransition,
        confirmTimerTypeChange,
        cancelTimerTypeChange,
        exitFullScreen
    } = usePomodoro();

    return (
        <>
            {/* Full Screen Focus Mode */}
            <FullScreenFocus
                isFullScreen={isFullScreen}
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

            {/* Timer Type Change Confirmation Modal */}
            {showTimerTypeConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Change Timer Type?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            You have an active timer running. Changing the timer type will reset your current session and you'll lose your progress. Are you sure you want to continue?
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={cancelTimerTypeChange}
                                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmTimerTypeChange}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Change to {pendingTimerType === 'short' ? '25/5' : '50/10'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}