'use client';

export default function CupAnimation({ mode, timeLeft, totalTime, isPaused }) {
    // Calculate fill percentage based on time remaining
    const getFillPercentage = () => {
        if (mode === 'idle' || totalTime === 0) return 100;
        return (timeLeft / totalTime) * 100;
    };

    const fillPercentage = getFillPercentage();
    
    // Determine cup color and animation based on mode
    const getCupStyle = () => {
        if (mode === 'work') {
            return {
                fill: '#ef4444', // Red for work
                stroke: '#dc2626'
            };
        } else if (mode === 'break') {
            return {
                fill: '#10b981', // Green for break
                stroke: '#059669'
            };
        } else {
            return {
                fill: '#6b7280', // Gray for idle
                stroke: '#4b5563'
            };
        }
    };

    const cupStyle = getCupStyle();

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-40">
                {/* Cup SVG */}
                <svg
                    viewBox="0 0 100 120"
                    className="w-full h-full"
                    style={{ filter: isPaused ? 'grayscale(50%)' : 'none' }}
                >
                    {/* Cup outline */}
                    <path
                        d="M20 20 L20 100 Q20 110 30 110 L70 110 Q80 110 80 100 L80 20 Q80 10 70 10 L30 10 Q20 10 20 20 Z"
                        fill="none"
                        stroke={cupStyle.stroke}
                        strokeWidth="2"
                        className="transition-all duration-300"
                    />
                    
                    {/* Cup handle */}
                    <path
                        d="M80 40 Q90 40 90 50 Q90 60 80 60"
                        fill="none"
                        stroke={cupStyle.stroke}
                        strokeWidth="2"
                        className="transition-all duration-300"
                    />
                    
                    {/* Liquid fill */}
                    {mode !== 'idle' && (
                        <rect
                            x="22"
                            y={120 - (fillPercentage / 100) * 90 - 20}
                            width="56"
                            height={(fillPercentage / 100) * 90}
                            fill={cupStyle.fill}
                            className="transition-all duration-1000 ease-out"
                            style={{
                                opacity: fillPercentage > 0 ? 0.8 : 0
                            }}
                        />
                    )}
                    
                    {/* Steam effect during work */}
                    {mode === 'work' && timeLeft > 0 && !isPaused && (
                        <>
                            <circle
                                cx="35"
                                cy="15"
                                r="2"
                                fill="#cbd5e1"
                                className="steam-animation"
                                style={{ animationDelay: '0s' }}
                            />
                            <circle
                                cx="45"
                                cy="12"
                                r="1.5"
                                fill="#cbd5e1"
                                className="steam-animation"
                                style={{ animationDelay: '0.5s' }}
                            />
                            <circle
                                cx="55"
                                cy="15"
                                r="2"
                                fill="#cbd5e1"
                                className="steam-animation"
                                style={{ animationDelay: '1s' }}
                            />
                        </>
                    )}
                </svg>
                
                {/* Pause overlay */}
                {isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            PAUSED
                        </div>
                    </div>
                )}
            </div>
            
            {/* Status text below cup */}
            <div className="text-center mt-4">
                {mode === 'work' && (
                    <p className="text-red-600 font-medium">
                        {timeLeft > 0 ? 'Focus Mode' : 'Work Complete!'}
                    </p>
                )}
                {mode === 'break' && (
                    <p className="text-green-600 font-medium">
                        {timeLeft > 0 ? 'Break Time' : 'Break Complete!'}
                    </p>
                )}
                {mode === 'idle' && (
                    <p className="text-gray-500 font-medium">
                        Ready to Focus
                    </p>
                )}
            </div>
        </div>
    );
}
