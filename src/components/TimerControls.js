export default function TimerControls({
    mode,
    isPaused,
    timerType,
    showConfirmation,
    completedWorkSessions,
    getBreakType,
    onStartWork,
    onStartBreak,
    onTogglePause,
    onReset,
    onChangeTimerType
}) {
    const isIdle = mode === 'idle';
    const isActive = mode === 'work' || mode === 'break';

    return (
        <div className="mt-6 flex flex-col space-y-4">
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => onChangeTimerType('short')}
                    className={`timer-button ${timerType === 'short'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    disabled={isActive && !isPaused}
                >
                    25/5
                </button>
                <button
                    onClick={() => onChangeTimerType('long')}
                    className={`timer-button ${timerType === 'long'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    disabled={isActive && !isPaused}
                >
                    50/10
                </button>
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={onStartWork}
                    className="timer-button timer-button-primary"
                    disabled={isActive && !isPaused || showConfirmation}
                >
                    Start Work
                </button>

                <button
                    onClick={onStartBreak}
                    className="timer-button bg-green-600 hover:bg-green-700 text-white"
                    disabled={isActive && !isPaused || showConfirmation}
                >
                    Start {getBreakType() === 'long' ? 'Long ' : ''}Break
                </button>
            </div>

            {isActive && (
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onTogglePause}
                        className="timer-button bg-yellow-500 hover:bg-yellow-600 text-white"
                        disabled={showConfirmation}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>

                    <button
                        onClick={onReset}
                        className="timer-button timer-button-danger"
                        disabled={showConfirmation}
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}