import PomodoroTimer from '@/components/PomodoroTimer';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
      <div className="mt-8 mb-12">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
          Pomodoro Timer
        </h1>
        <p className="text-center text-gray-600 mt-2 text-lg">
          Boost your productivity with focused work sessions and mindful breaks
        </p>
        <p className="text-center text-gray-500 mt-1 text-sm">
          Work in focused 25 or 50-minute sessions, take short breaks, and enjoy a long break after 4 sessions
        </p>
      </div>

      <PomodoroTimer />
    </div>
  );
}