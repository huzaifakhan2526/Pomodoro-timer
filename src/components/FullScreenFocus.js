'use client';

import { useEffect, useState } from 'react';

// Mock formatTime function for demo
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function FullScreenFocus({
    mode = 'work',
    timeLeft = 1500, // 25 minutes for demo
    totalTime = 1500,
    isPaused = false,
    onTogglePause = () => { },
    onReset = () => { },
    onExit = () => { }
}) {
    const [showControls, setShowControls] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [mouseIdle, setMouseIdle] = useState(false);

    // Show controls on mouse move or key press
    useEffect(() => {
        let timeout;
        let idleTimeout;

        const showControlsTemporarily = () => {
            setShowControls(true);
            setMouseIdle(false);

            clearTimeout(timeout);
            clearTimeout(idleTimeout);

            timeout = setTimeout(() => setShowControls(false), 4000);
            idleTimeout = setTimeout(() => setMouseIdle(true), 2000);
        };

        const handleMouseMove = () => showControlsTemporarily();
        const handleKeyPress = (e) => {
            e.preventDefault();

            if (e.key === 'Escape') {
                if (showExitConfirm) {
                    setShowExitConfirm(false);
                } else {
                    setShowExitConfirm(true);
                    showControlsTemporarily();
                }
            } else if (e.key === ' ') {
                onTogglePause();
                showControlsTemporarily();
            } else if (e.key === 'r' || e.key === 'R') {
                onReset();
                showControlsTemporarily();
            } else {
                showControlsTemporarily();
            }
        };

        if (mode === 'work') {
            // Prevent body scroll and hide cursor when idle
            document.body.style.overflow = 'hidden';
            document.body.style.userSelect = 'none';

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('keydown', handleKeyPress);

            // Show controls initially
            showControlsTemporarily();
        }

        return () => {
            // Restore body styles
            document.body.style.overflow = '';
            document.body.style.userSelect = '';

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyPress);
            if (timeout) clearTimeout(timeout);
            if (idleTimeout) clearTimeout(idleTimeout);
        };
    }, [mode, showExitConfirm, onTogglePause, onReset]);

    // Auto-hide cursor when idle
    useEffect(() => {
        if (mouseIdle) {
            document.body.style.cursor = 'none';
        } else {
            document.body.style.cursor = '';
        }

        return () => {
            document.body.style.cursor = '';
        };
    }, [mouseIdle]);

    const handleExitConfirm = () => {
        setShowExitConfirm(false);
        // For demo purposes, hide the component by changing mode
        // In real app, this would be handled by parent component
        onExit();

        // Force component to unmount by changing mode
        window.location.reload();
    };

    const handleExitCancel = () => {
        setShowExitConfirm(false);
    };

    if (mode !== 'work') return null;

    const progress = totalTime > 0 ? timeLeft / totalTime : 0;
    const isLowTime = progress < 0.1;
    const isEmpty = timeLeft <= 0;

    return (
        <div className={`fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center transition-all duration-1000 ${mouseIdle ? 'cursor-none' : ''}`}>
            {/* Ambient background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '0s', animationDuration: '8s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '4s', animationDuration: '12s' }} />
            </div>

            {/* Main content area - only cup animation */}
            <div className="flex items-center justify-center px-4">

                {/* Cup Animation - responsive sizing */}
                <div className="relative w-40 h-48 sm:w-56 sm:h-68 lg:w-72 lg:h-80 xl:w-80 xl:h-96">
                    <svg
                        viewBox="0 0 120 140"
                        className="w-full h-full drop-shadow-2xl transition-all duration-500"
                        style={{
                            filter: isPaused ? 'grayscale(50%) brightness(0.7)' : 'none',
                            transform: isEmpty ? 'scale(0.95)' : 'scale(1)'
                        }}
                    >
                        {/* Enhanced cup shadow with breathing effect */}
                        <ellipse
                            cx="60"
                            cy="135"
                            rx="45"
                            ry="8"
                            fill="#000000"
                            opacity={isEmpty ? "0.1" : "0.3"}
                            className="transition-all duration-1000"
                        />

                        {/* Cup outline with glow effect */}
                        <path
                            d="M25 25 L25 105 Q25 115 35 115 L75 115 Q85 115 85 105 L85 25 Q85 15 75 15 L35 15 Q25 15 25 25 Z"
                            fill="none"
                            stroke={isEmpty ? "#666666" : "#ffffff"}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="transition-all duration-500 drop-shadow-lg"
                            style={{
                                filter: isEmpty ? 'none' : 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                            }}
                        />

                        {/* Cup handle */}
                        <path
                            d="M85 35 Q95 35 98 45 Q100 55 95 65 Q90 70 85 65"
                            fill="none"
                            stroke={isEmpty ? "#666666" : "#ffffff"}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />

                        {/* Enhanced liquid fill with gradient - properly clipped */}
                        {totalTime > 0 && timeLeft > 0 && (
                            <>
                                {/* Define clipping path to match cup interior */}
                                <defs>
                                    <clipPath id="cupClip">
                                        <path d="M27 25 L27 105 Q27 113 33 113 L77 113 Q83 113 83 105 L83 25 L27 25 Z" />
                                    </clipPath>
                                    <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={
                                            isLowTime ? "#ff6b6b" :
                                                progress < 0.3 ? "#ffa500" :
                                                    "#ffff00"
                                        } />
                                        <stop offset="100%" stopColor={
                                            isLowTime ? "#ff4444" :
                                                progress < 0.3 ? "#ff8c00" :
                                                    "#ffff66"
                                        } />
                                    </linearGradient>
                                </defs>

                                {/* Main liquid with clipping */}
                                <rect
                                    x="27"
                                    y={140 - progress * 80 - 25}
                                    width="56"
                                    height={progress * 80}
                                    fill="url(#liquidGradient)"
                                    clipPath="url(#cupClip)"
                                    className="transition-all duration-1000 ease-out"
                                    style={{
                                        filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.3))'
                                    }}
                                />

                                {/* Liquid highlight with clipping */}
                                <rect
                                    x="30"
                                    y={140 - progress * 80 - 25}
                                    width="12"
                                    height={progress * 80}
                                    fill="#ffffff"
                                    clipPath="url(#cupClip)"
                                    className="transition-all duration-1000 ease-out"
                                    style={{ opacity: 0.4 }}
                                />

                                {/* Surface reflection with clipping */}
                                <ellipse
                                    cx="55"
                                    cy={140 - progress * 80 - 25}
                                    rx="22"
                                    ry="2"
                                    fill="#ffffff"
                                    clipPath="url(#cupClip)"
                                    className="transition-all duration-1000 ease-out"
                                    style={{ opacity: 0.6 }}
                                />
                            </>
                        )}

                        {/* Enhanced steam effect */}
                        {timeLeft > 0 && !isPaused && !isLowTime && (
                            <>
                                {[0, 1, 2].map((i) => (
                                    <circle
                                        key={i}
                                        cx={45 + i * 15}
                                        cy={20 - i * 2}
                                        r={2 - i * 0.3}
                                        fill="#ffffff"
                                        opacity={0.6 - i * 0.1}
                                        className="animate-pulse"
                                        style={{
                                            animationDelay: `${i * 0.8}s`,
                                            animationDuration: '3s'
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </svg>
                </div>
            </div>

            {/* Controls overlay - responsive positioning */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>

                {/* Top bar with exit and info */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={() => setShowExitConfirm(true)}
                            className="p-2 sm:p-3 bg-red-600/80 hover:bg-red-600 rounded-full transition-all duration-200 backdrop-blur-sm border border-red-500/30"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-xs sm:text-sm text-gray-300 bg-black/50 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                            Focus Mode
                        </div>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-400 bg-black/50 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                        ESC to exit • SPACE to pause • R to reset
                    </div>
                </div>

                {/* Bottom controls - responsive */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-3 sm:space-x-4 bg-black/60 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-2 sm:py-3 border border-white/10">
                        <button
                            onClick={onTogglePause}
                            className="p-2 sm:p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-all duration-200 border border-blue-500/30"
                        >
                            {isPaused ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={onReset}
                            className="p-2 sm:p-3 bg-gray-600/80 hover:bg-gray-600 rounded-full transition-all duration-200 border border-gray-500/30"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Exit confirmation modal - responsive */}
            {showExitConfirm && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-10">
                    <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 max-w-sm sm:max-w-md mx-auto">
                        <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-red-600/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Exit Focus Mode?</h3>
                            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                                Are you sure you want to exit? Your current session progress will be lost.
                            </p>
                            <div className="flex space-x-3 sm:space-x-4">
                                <button
                                    onClick={handleExitCancel}
                                    className="flex-1 px-4 py-2 sm:px-6 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base"
                                >
                                    Stay
                                </button>
                                <button
                                    onClick={handleExitConfirm}
                                    className="flex-1 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base"
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}