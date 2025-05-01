import PomodoroTimer from '@/components/PomodoroTimer';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
      <div className="mt-8 mb-12">
        <h1 className="text-3xl font-bold text-center">Pomodoro Timer</h1>
        <p className="text-center text-gray-600 mt-2">
          Focus on your work with timed sessions and breaks
        </p>
      </div>

      <PomodoroTimer />
    </div>
  );
}