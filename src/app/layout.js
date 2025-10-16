import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pomodoro Timer',
  description: 'A productivity timer with work and break cycles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto sidebar-main">
              <div className="container mx-auto px-4 py-8 pt-24">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}