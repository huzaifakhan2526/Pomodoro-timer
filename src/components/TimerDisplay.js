import { formatTime } from '@/utils/formatTime';
import CupAnimation from './CupAnimation';

export default function TimerDisplay({
    mode,
    timeLeft,
    totalTime,
    isPaused,
    showConfirmation,
    timerType,
    completedWorkSessions,
    getBreakType,
    onConfirm
}) {
    const getDisplayText = () => {
        if (showConfirmation) {
            if (mode === 'completed' && timeLeft === 0) {
                // Determine if this was a work or break session
                const wasWorkSession = completedWorkSessions > 0 && completedWorkSessions % 4 === 0;
                if (wasWorkSession) {
                    return 'Work session complete! Take a long break.';
                }
                return 'Work session complete! Take a short break.';
            } else {
                const breakType = getBreakType();
                return `Break over! Ready for the next focus session?${breakType === 'long' ? ' (Long break completed)' : ''}`;
            }
        }

        if (mode === 'idle') {
            return 'Select a timer and start working';
        }

        return mode === 'work' ? 'FOCUS' : 'BREAK';
    };

    const getTimerClass = () => {
        if (mode === 'idle') return 'text-gray-500';
        if (mode === 'work') return 'text-red-500';
        if (mode === 'break') return 'text-green-500';
        if (mode === 'completed') return 'text-blue-500';
        return '';
    };

    return (
        <div className={`timer-card flex flex-col items-center justify-center ${
            mode === 'work' ? 'focus-mode' : 
            mode === 'break' ? 'break-mode' : ''
        }`}>
            {/* Cup Animation */}
            <CupAnimation 
                mode={mode} 
                timeLeft={timeLeft} 
                totalTime={totalTime} 
                isPaused={isPaused} 
            />
            
            <h2 className={`text-2xl font-bold mb-2 ${getTimerClass()}`}>
                {getDisplayText()}
            </h2>

            {(mode !== 'idle' || showConfirmation) && (
                <>
                    <div className="text-6xl font-bold mb-4">
                        {formatTime(timeLeft)}
                    </div>

                    {showConfirmation && (
                        <button
                            onClick={onConfirm}
                            className="timer-button timer-button-primary mt-4"
                        >
                            {timeLeft === 0 && mode === 'completed' ? 'Start Break' : 'Start Work'}
                        </button>
                    )}

                    {isPaused && !showConfirmation && (
                        <div className="text-yellow-500 font-medium mt-2">
                            PAUSED
                        </div>
                    )}
                </>
            )}

            {mode === 'idle' && !showConfirmation && (
                <div className="text-gray-500 mt-2">
                    <div>Current mode: {timerType === 'short' ? '25/5' : '50/10'}</div>
                    <div className="text-sm mt-1">
                        Completed sessions: {completedWorkSessions} 
                        {completedWorkSessions > 0 && completedWorkSessions % 4 === 0 && (
                            <span className="text-blue-600 font-medium"> (Long break next!)</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}