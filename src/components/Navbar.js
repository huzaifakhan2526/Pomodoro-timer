import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                            Pomodoro Timer
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                            Timer
                        </Link>
                        <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}