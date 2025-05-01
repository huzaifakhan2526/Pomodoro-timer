import { formatTime } from '@/utils/formatTime';

export default function TimerDisplay({
    mode,
    timeLeft,
    isPaused,
    showConfirmation,
    timerType,
    onConfirm
}) {
    const getDisplayText = () => {
        if (showConfirmation) {
            return mode === 'completed' && timeLeft === 0
                ? 'Work completed! Ready for a break?'
                : 'Break completed! Start another session?';
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
        <div className="timer-card flex flex-col items-center justify-center">
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
                            {timeLeft === 0 && mode === 'completed' ? 'Start Break' : 'Start New Session'}
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
                    Current mode: {timerType === 'short' ? '25/5' : '50/10'}
                </div>
            )}
        </div>
    );
}