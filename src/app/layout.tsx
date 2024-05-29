import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/authProvider';
import { AuthScreen } from '@/components/authScreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JournalMatcher',
  description: 'Find the perfect journal for your research',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>
          <AuthProvider>
            <AuthScreen>{children}</AuthScreen>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
