import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatButton from '@/components/ChatButton';
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BabyGal NGO',
  description: 'Supporting girls through their teenage years, pregnancy, and parenthood',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9941754648272115"
     crossorigin="anonymous"></script>
    </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Toaster />
            <Footer />
            <ChatButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}