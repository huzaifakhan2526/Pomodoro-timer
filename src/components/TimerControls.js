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
                    className="timer-button timer-button-primary relative group"
                    disabled={isActive && !isPaused || showConfirmation}
                >
                    Start Work
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Full Screen
                    </div>
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